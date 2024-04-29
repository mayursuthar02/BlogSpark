const express = require('express');
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/User')
const Blog = require('../models/Blog')
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const { error } = require('console');
require("dotenv").config(); // Load environment variables from .env file

// STORAGE FOR BLOG IMG
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // Update the destination path
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // For example, 1MB
  }
});

// STORAGE FOR PROFILE AND COVER IMG
const ProfileAndCoverImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/userImg'); // Update the destination path
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProfileAndCoverImg = multer({
    storage: ProfileAndCoverImgStorage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // Adjust the fieldSize limit as needed (e.g., 10 MB)
    }
});


// Routers
router.get('/', (req, res) => {
    res.send('Welcome to route!');
});

// REGISTER ROUTER
router.post('/register', async (req, res)=> {
    const { fullName, username, email, categoriesList, password } = req.body;
    try {
        // Check user exist or not
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            const errorMessage = existingUser.username === username ?
                "User already exists! Please change username." :
                "User already exists! Please change email Id.";
                
            return res.status(400).json({ error: errorMessage });
        }
        
        // Hash the password
        const hashPassword = await bcrypt.hash(password,10);

        // Create a user
        const newUser = new User({
            fullName,
            username,
            email,
            categoriesList,
            password : hashPassword,
            profileImg: null,
            coverImg: null,
            bio: null
        })
        // save user to database
        await newUser.save();
        return res.status(200).json({message: "User registered successfully."})
    } catch (error) {
        return res.status(500).json({error: "Register error."})
    }
})


// LOGIN ROUTE
router.post('/login', async (req,res)=> {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        // check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Create JWT token
        const token = jwt.sign({userId: user._id,username}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// MIDDLEWARE AUTHENTICATEDUSER
const authenticateUser = (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
// FETCH AUTHORIZED USER DATA
router.get("/api/user", authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const userData = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        followers: user.followers,
        blogIds: user.blogIds,
        coverImg : user.coverImg, 
        profileImg: user.profileImg,
        favourite: user.favourite
      };
  
      return res.json(userData);
    } catch (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  });


// FETCH ALL USER DATA
router.get("/api/allusers", async (req, res) => {
    try {
      // Fetch all users data
      const allUsers = await User.find({}, "_id fullName username followers blogIds categoriesList bio coverImg profileImg");
      // Send the list of users in the response
      res.json(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  
// CREATE A BLOG
router.post('/create-blog', upload.single('file'), async (req,res) => {
    const {userId, title, summary, category, content, tags} = req.body;
    try {
        const user = await User.findOne({_id : userId});
        if (!user) {
            return res.status(400).json({error: "User not found."})
        }
        const newBlog = new Blog({
            title,
            summary,
            category,
            content,
            tags,
            blogImg: req.file.filename,
            userId : user._id
        })
        await newBlog.save()

        // Update the user document to include the new blog's ID in blogIds field
        user.blogIds.push(newBlog._id);
        await user.save();
        
        // File upload and data save successful
        res.status(200).json({ message: "Data saved successfully", blog: newBlog });
    } catch (error) {
        console.error("Error uploading data:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// FETCH ALL BLOG DATA
router.get('/api/blogs', async(req, res)=> {
    try {
        const blogs = await Blog.find().populate('userId','fullName username profileImg coverImg');
        if (!blogs) {
            return res.status(400).json({err: "Blogs not found"});
        }
        res.json(blogs);
    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// FETCH BLOG DATA
router.get('/api/blog/:id', async(req,res)=> {
  const {id} = req.params;
  try {
    const blog = await Blog.findById(id).populate('userId', 'fullName username profileImg');
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
} catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
} 
})

// UPDATE THE USER DATA
router.put('/update/images/:userId', uploadProfileAndCoverImg.fields([{ name: 'profileImg', maxCount: 1 }, { name: 'coverImg', maxCount: 1 }]), async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        
        // Update user fields
        user.username = req.body.username || user.username; // Use existing value if not provided in request
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        // Update user fields if provided in the request
        if (req.files['profileImg']) {
            user.profileImg = req.files['profileImg'][0].filename;
        }
        if (req.files['coverImg']) {
            user.coverImg = req.files['coverImg'][0].filename;
        }
        // Save updated user data
        await user.save();

        return res.status(200).json({ message: 'Profile and cover images updated successfully', user: user });

    } catch (error) {
        console.error('Error updating images:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
})


// UPDATE THE BLOG
router.put('/update/blog/:blogId', upload.single('file'), async(req,res) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            res.status(400).json({error: 'Blog not found'});
        }

        blog.title = req.body.title || blog.title;
        blog.summary = req.body.summary || blog.summary;
        blog.category = req.body.category || blog.category;
        blog.content = req.body.content || blog.content;
        blog.tags = req.body.tags || blog.tags;
        // console.log(req.file.filename)
        if (req.file) {
            blog.blogImg = req.file.filename;
        }
        
        await blog.save();

        res.status(200).json({message: 'blog updated', blog})
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
})

// DELETE THE BLOG
router.delete('/delete/blog/:blogId', async(req, res) => {
    const blogId = req.params.blogId;
    try {

        const deleteBlogData = await Blog.findByIdAndDelete(blogId);
        if (!deleteBlogData) {
            res.status(200).json({error: "Blog not deleted"})
        }
        res.status(200).json({message: "Blog deleted"})

    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
})
  
//   ADD FAVOURITE BLOG
router.put('/api/user/favorites/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId;

    try {
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const user = await User.findById(userId)
        if (!user) {
            res.status(404).json({error: 'User not found'})
        }
    
        if (user.favourite.includes(blogId)) {
            return res.status(400).json({error: 'Blog already in favourite'})
        }
        user.favourite.push(blogId);
        await user.save();
        res.status(200).json({message: 'Blog added in favourite', user})
    } catch (error) { 
        console.error('Error adding blog to favorites:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });

//   REMOVE FAVOURITE BLOG
  router.put('/api/delete/favorites/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId;

    try {
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user = await User.findById(userId)
        if (!user) {
            res.status(404).json({error: 'User not found'})
        }
    
        if (!user.favourite.includes(blogId)) {
            return res.status(400).json({error: 'Blog not found in favourite'})
        }
        user.favourite.pull(blogId);
        await user.save();
        res.status(200).json({message: 'Blog removed in favourite', user})
    } catch (error) {
        console.error('Error removing blog to favorites :', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  })


// USER FAVOURITE BLOGS
router.get('/user/favourite/blogs/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate({ 
            path: 'favourite', 
            populate: { path: 'userId', select: 'username _id' } 
        });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        res.status(200).json({ blogs: user.favourite });
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
})

router.get('/api/blogs/search', async (req, res) => {
    let { query } = req.query;
    console.log({query});
    
    // Escape special characters in the query string
    query = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    try {
        // Search for blogs based on title, username, and categories
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search for title
                { username: { $regex: query, $options: 'i' } }, // Case-insensitive regex search for username
                { category: { $regex: query, $options: 'i' } } // Case-insensitive regex search for categories
            ]
        });

        res.json({ message: 'Hello', blogs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// FOLLOW FEATURES API
router.put('/api/user/follow/:userId', async(req,res) => {
    const authorizedUser = req.params.userId;
    const usersId = req.body.userId;
    try {
        const user = await User.findById(authorizedUser);
        if(!user) {
            return res.status(400).json({error: 'User not found.'});
        }
        if (user.followers.includes(usersId)) {
            return res.status(400).json({error: 'You are already following this user.'});
        }
        user.followers.push(usersId);
        await user.save();
        res.status(200).json({message: 'You are now following this user.', user});
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

// UNFOLLOW FEATURES API
router.put('/api/user/unfollow/:userId', async(req,res) => {
    const authorizedUser = req.params.userId;
    const usersId = req.body.userId;
    try {
        const user = await User.findById(authorizedUser);
        if(!user) {
            return res.status(400).json({error: 'User not found.'});
        }
        if (!user.followers.includes(usersId)) {
            return res.status(400).json({error: 'You are not following this user.'});
        }
        user.followers.pull(usersId);
        await user.save();
        res.status(200).json({message:'You have unfollowed this user.', user});
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

module.exports = router;
