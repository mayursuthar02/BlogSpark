import React, { useContext, useEffect, useState } from "react";
import avtar from '../../assets/Images/Avtar Profile.jpg'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import AuthContext from "../../ContextApi/AuthContext";
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = ({allUserData,setIsLoggedIn}) => {
  const { userData } = useContext(AuthContext)
  const navigate = useNavigate();
  const {username} = useParams();
  const [user_Data, setUserData] = useState(null);
  const [followingValue, setFollowingValue] = useState("Follow")

  // FOR TOAST
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

  // Fetch user data based on username
  useEffect(() => {
    const $userData = allUserData?.find(user => user.username === username);
    setUserData($userData);
  }, [allUserData, username, userData]);
  
  useEffect(() => {
    if (user_Data && userData?.followers.includes(user_Data._id)) {
      setFollowingValue('Unfollow');
    }else {
      setFollowingValue('Follow');
    }
  }, [user_Data, userData]);
  
  
  const handleLogout = () => {
    Cookies.remove('token')
    setIsLoggedIn(false)
    navigate('/login');
  }
  if (!user_Data) {
    return <Loading/>;
  }

  const handleFollowing = async() => {
    if (followingValue == "Follow") {
      const response = await fetch(`http://localhost:5000/api/user/follow/${userData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user_Data._id })
      });
      const data = await response.json();
      if (response.ok) {
        setFollowingValue("Unfollow")
      } else {
        if (!userData) {
          showErrorToast('Please login the account');
        }else {
          showErrorToast('Error to following');
        }
      }
    }else {
      const response = await fetch(`http://localhost:5000/api/user/unfollow/${userData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user_Data._id })
      });
      const data = await response.json();
      if (response.ok) {
        setFollowingValue("Follow")
      } else {
        if (!userData) {
          showErrorToast('Please login the account');
        }else {
          showErrorToast('Error to following');
        }
      }
    }
  }

  return (
    <div className="user-details">
      <div className="profile-img">
        <div className="img-wrapper">
          {user_Data.profileImg ? (<img src={`http://localhost:5000/userImg/${user_Data.profileImg}`} alt="Profile Image" />) : (<img src={avtar} alt="Profile Image" />)}
        </div>
      </div>

      <div className="user-name">
        <p className="userFullName">{user_Data?.fullName}</p>
        <p className="username">@{user_Data?.username}</p>
        {user_Data.bio && <p className="bio">{user_Data.bio}</p>}
      </div>

      <div className="followBtn">
       {user_Data.username != userData?.username && <button className="btn" onClick={handleFollowing}>{followingValue}</button>}
      </div>

      <div className="like-follow-blogs-number">
        <div className="section">
          <div className="number">{user_Data?.blogIds.length}</div>
          <div className="text">Blogs</div>
        </div>
        <div className="section">
          <div className="number">{user_Data?.followers.length}</div>
          <div className="text">Followers</div>
        </div>
        <div className="section">
          <div className="number">18k</div>
          <div className="text">Likes</div>
        </div>
      </div>

      <div className="user-categories">
        <div className="title">Categories</div>
        <ul className="categoriesList">
          {
            user_Data.categoriesList.map((category,index) => (
              <li key={index}>{category}</li>
            ))
          }
        </ul>
      </div>

        {user_Data.username == userData?.username && <button className="logout-btn" onClick={handleLogout}>Log Out</button>}

        {user_Data.username == userData?.username && <button className="delete-btn" onClick={handleLogout}>Delete account</button>}
    </div>
  );
};

export default UserDetails;
