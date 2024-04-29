import React, { useContext, useEffect, useState } from 'react'
import editIcon from '../../assets/Icon/edit.png'
import UserDetails from './UserDetails'
import BlogCard from '../../Components/BlogCard/BlogCard'
import AuthContext from '../../ContextApi/AuthContext'
import Loading from '../../Components/Loading/Loading'
import { Link, useParams } from 'react-router-dom'
import EditProfileModel from './EditProfileModel';

const ProfilePage = () => {
  const {username} = useParams();
  const [userBlogs, setUserBlogs] = useState([])
  const {allUserData, setIsLoggedIn, allBlogData,userData, fetchAllBlogsData, fetchAllUserData} = useContext(AuthContext);
  const [isShow, setIsShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user_Data, setUser_Data] = useState()

  useEffect(() => {
    fetchAllUserData();
    fetchAllBlogsData();
    const user = allUserData?.find(user => user.username == username);
    console.log(user)
    setUser_Data(user)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])
  
  
  // Filter user BlogData
  useEffect(() => {
    fetchAllUserData();
    const filteredBlogs = allBlogData?.filter(blog => blog.userId.username === username);
    setUserBlogs(filteredBlogs);
  }, [allBlogData, username]);
  
  // if (!userBlogs || userBlogs.length === 0) {
  //   return <Loading />;
  // }
  
  if ( loading) {
    return <Loading />;
  }
  
  return (
    <div className='profile_section'>

        <div className="left-side">
          <UserDetails allUserData={allUserData} setIsLoggedIn={setIsLoggedIn} username={username}/>
        </div>
        
        <div className="right-side">

          <div className="cover-img">
            {user_Data?.coverImg && <img src={`http://localhost:5000/userImg/${user_Data.coverImg}`} alt="" /> }
            {userData?.username == username && <div className="edit-profile-btn" onClick={()=> setIsShow(true)}>
              Edit Profile
            </div>}
          </div>          

          <div className="blogs">
            <div className="blog-header">
              <h3 className="blog-title">Blogs</h3>
              {userData?.username == username && <Link to={'/create-blog'} className='create-blog-btn'>
                <img src={editIcon} alt="" />
                Create Blog
              </Link>}
            </div>

            <div className="blogs-list">
              {userBlogs?.slice().reverse().map(blog => (
                <BlogCard blog={blog} key={blog._id}/> 
              ))}
            </div>

          </div>
        </div>

        {isShow && <EditProfileModel userData={userData} setIsShow={setIsShow}/>}
        {isShow && <div className="overlay" onClick={()=> setIsShow(false)}></div>}
    </div>
  )
}

export default ProfilePage