import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import avtar from "../../assets/Images/Avtar Profile.jpg";
import editIcon from "../../assets/Icon/edit.png";
import deleteIcon from "../../assets/Icon/delete.png";
import BlogCard from "./BlogCard";
import Loading from "../../Components/Loading/Loading";
import AuthContext from "../../ContextApi/AuthContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetails = () => {
  const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  const { fetchAllBlogsData, allBlogData, userData } = useContext(AuthContext);
  
    // For Toast
    const showSucessToast = (message) => {
      toast.success(`${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    };
    const showErrorToast = (message) => {
      toast.error(`${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    };


  const handleDeleteBlog = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete/blog/${id}`, {
        method: "DELETE",
      })
      const data = await response.json();
      if (response.ok) {
        showSucessToast("Blog deleted");
        console.log(data);
        navigate(`/profile/${userData?.username}`);
      }else {
        showErrorToast("Error to delete the blog")
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=> {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchAllBlogsData();
        const response = await fetch(`http://localhost:5000/api/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
        } else {
          console.error('Failed to fetch blog data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
  
    fetchData(); // Immediately invoke the function to fetch data
  }, [id]);

  // Check if the blogData is not found
  if (!blogData || isLoading) {
    return <Loading />; // Display loading indicator
  }

  // Ensure blogData.tags exists before accessing it
  const tags = blogData.tags ? blogData.tags.split("#").filter(tag => tag.trim() !== "") : [];
  // console.log(blogData);
  const date = new Date(blogData.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="blogDetails">
      <div className="left-side-blog-detail">
        <div className="blog-detail">
          <h1 className="title">{blogData.title}</h1>

          <p className="subDesc">{blogData.summary}</p>

          <div className="user-details-and-edit-btn">
            <div className="use-details">
              <div className="profile-pic">
              {blogData.userId.profileImg ? (<img src={`http://localhost:5000/userImg/${blogData.userId.profileImg}`} alt="Profile Image" />) : (<img src={avtar} alt="Profile Image" />)}
              </div>
              <div className="name-date">
                <Link className="name" to={`/profile/${blogData.userId.username}`}>@{blogData.userId.username}</Link>
                <p className="date">{formattedDate}</p>
              </div>
            </div>
            {userData?.id == blogData.userId._id && (
              <div className="btn">
              <Link className="edit-btn" to={`/edit-blog/${id}`}>
                <div className="img-wrapper">
                  <img src={editIcon} alt="" />
                </div>
                Edit
              </Link>
              <Link className="delete-btn" onClick={handleDeleteBlog}>
                <div className="img-wrapper">
                  <img src={deleteIcon} alt="" />
                </div>
                Delete
              </Link>
              </div>

            )}
          </div>
            
          <div className="blog-cover-img">
            { console.log(`http://localhost:5000/images/${blogData.blogImg}`) }
            <img src={`http://localhost:5000/images/${blogData.blogImg}`} alt="Blog Cover Image" />

          </div>

          <p className="category-tag">
            <span>{blogData.category}</span>
          </p>

          <p className="blog-content" dangerouslySetInnerHTML={{__html: blogData.content}}></p>

          <ul className="tagsList">
            <span>tags : </span>
            {tags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="right-side-other-blogs">
        <div
          className="trending-blogs"
          style={{ position: "sticky", top: "0", zIndex: "99" }}
        >
          <h2 className="title">Top Blogs</h2>
          <div className="blogs-list">
            {allBlogData?.slice(0, 5).map((blog, index) => (
              <BlogCard key={index} blog={blog} setIsLoading={setIsLoading}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
