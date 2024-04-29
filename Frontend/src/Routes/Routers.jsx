import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../Pages/HomePage/HomePage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import RegisterPage from '../Pages/RegisterPage/RegisterPage'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import BlogDetails from '../Pages/BlogDetails/BlogDetails'
import BlogsPage from '../Pages/BlogsPage/BlogsPage'
import WriteBlogPage from '../Pages/CreateEditBlogPage//WriteBlogPage'
import EditBlog from '../Pages/CreateEditBlogPage/EditBlog'
import FavouritePage from '../Pages/FavouritePage/FavouritePage'
import SearchPage from '../Pages/SearchPage/SearchPage'
import AuthContext from '../ContextApi/AuthContext'

const Routers = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <LoginPage/>}/>
        <Route path='/register' element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage/>}/>
        <Route path='/profile/:username' element={<ProfilePage/>}/>
        <Route path='/blog-detail/:id' element={<BlogDetails/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
        <Route path='/blogs/:category' element={<BlogsPage/>}/>
        <Route path='/blogs/category/:category' element={<BlogsPage/>}/>
        <Route path='/create-blog' element={<WriteBlogPage/>}/>
        <Route path='/edit-blog/:id' element={<EditBlog/>}/>
        <Route path='/search/:searchtext' element={<SearchPage/>}/>
        {isLoggedIn ? (<Route path='/favourite' element={<FavouritePage/>}/>): (<Route path='/favourite' element={<Navigate to="/login" />}/>)}
    </Routes>
  )
}

export default Routers