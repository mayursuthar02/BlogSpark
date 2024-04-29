import React from 'react'
import './home.css'
import BlogList from './BlogList'
import Img1 from '../../assets/Images/img.jpg'
import Img2 from '../../assets/Images/img2.jpg'
import Img3 from '../../assets/Images/img3.jpg'
import Img4 from '../../assets/Images/img4.jpg'
import Img5 from '../../assets/Images/img5.jpg'
import techImg from '../../assets/Images/tech.png'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className='Home_Section'>

      <div className="home-banner-section">
        <p>Step into the world of BlogSpark,
          Where our thoughts, stories, and 
          ideas come to life.</p>

        <div className="img-section">
          <div className="img">
            <img src={Img1} alt="" />
          </div>
          <div className="img">
            <img src={Img2} alt="" />
          </div>
          <div className="img">
            <img src={Img3} alt="" />
          </div>
          <div className="img">
            <img src={Img4} alt="" />
          </div>
          <div className="img">
            <img src={Img5} alt="" />
          </div>
        </div>      
      </div>

      <BlogList title={"Top Blogs"} tags={"top"}/>

      <BlogList title={"Food Blogs"} tags={"Food"}/>

      <div className="blogs-banner">
        <div className="img">
          <img src={techImg} alt="" />
        </div>
        <div className="blog-detail">
          <div className="title">The new AI disruption tool: Devin(e) or Devil for software engineers?</div>
          <div className="desc">After ChatGPT made waves all over the world for its surprising generative AI capacity, a US-based company called Cognition has announced the launch of a new AI tool called Devin which it claims to be the world's first fully autonomous AI software engineer which can write code with command prompts. </div>
          <Link to={'/blog-detail/662be08e1bf25a0a5c43c5a2'}>Continue reading</Link>
        </div>  
      </div>


      <BlogList title={"Travel Blogs"} tags={"Travel"}/>

      <BlogList title={"News Blogs"} tags={"News"}/>
    </div>
  )
}

export default HomePage