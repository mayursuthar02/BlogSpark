import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import profileAvtar from "../../assets/Images/Avtar Profile.jpg";
import AuthContext from '../../ContextApi/AuthContext'
import heartIcon from '../../assets/Icon/heart.png'
import fillHeartIcon from '../../assets/Icon/fillHeart.png'
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogCard = ({blog}) => {
  const {allUserData, userData} = useContext(AuthContext);
  const [user_Data, setUserData] = useState("")
  const [heartIconSet, setHeartIconSet] = useState(heartIcon)
  
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

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

  useEffect(()=> {
    const $userData = allUserData?.find(user => user._id == blog.userId._id);
    setUserData($userData);
    if (userData?.favourite.includes(blog._id)) {
      setHeartIconSet(fillHeartIcon);
    }else {
      setHeartIconSet(heartIcon);
    }
  },[])
  
  // Handle favourite feature
  const handleFavourite = async () => {
    if (heartIconSet == heartIcon) {
      const response = await fetch(`http://localhost:5000/api/user/favorites/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userData?.id })
      });
      const data = await response.json();
      if (response.ok) {
        setHeartIconSet(fillHeartIcon);
        showSucessToast("Blog added in favourites");
      } else {
        if (!userData) {
          showErrorToast('Please login the account');
        }else {
          showErrorToast('Error adding blog to favorites');
        }
      }
      
    } else {
      const response = await fetch(`http://localhost:5000/api/delete/favorites/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userData.id })
      });
      const data = await response.json();
      if (response.ok) {
        setHeartIconSet(heartIcon);
        showSucessToast("Blog removed in favourites");
      } else {
        showErrorToast('Error removing blog to favorites');
      }
    }
  }


  return (
    <div className='blogCard'>
      <div className="blog-img">
      <img src={`http://localhost:5000/images/${blog.blogImg}`} alt="Blog Cover Image" />
      </div>
      
      <div className="detail">
      
        <Link to={`/blog-detail/${blog._id}`} className="title">{blog.title}</Link>

        <p className="desc">{blog.summary.length > 120 ? `${blog.summary.slice(0,120)}...` : blog.summary}</p>

        <p className="date">{formattedDate}</p>
        
        <div className="categories-tag">
          <span>{blog.category}</span>
        </div>
      </div>
      
      <div className="userDetails">
        <div className="favourite-btn" onClick={handleFavourite}>
          <img src={heartIconSet} alt="" />
        </div>
        <Link to={`/profile/${blog.userId.username}`} className="username">@{blog.userId.username}</Link>
      </div>

    </div>
  )
}

export default BlogCard