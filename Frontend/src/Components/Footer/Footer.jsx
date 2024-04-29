import React from 'react'
import logo from "../../assets/Images/Logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer-section'>
      
      <div className="blog-short-desc">

        <div className="logo-section">
          <div className="logo">
            <img src={logo} alt="Blogify Logo" />
          </div>
          <h3 className="name">BlogSpark</h3>
        </div>

        <div className="desc">
          <p>
          "Dive into captivating stories and insightful articles on our blog platform. Explore a world of ideas, inspiration, and knowledge. Join us on a journey of discovery!"
          </p>  
        </div>

      </div>

      <div className="links">
        <div className="title">LINKS</div>
        <ul className="link">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/blogs'}>Blogs</Link></li>
          <li><Link to={'/contactus'}>ContactUs</Link></li>
        </ul>
      </div>

      <div className="links">
        <div className="title">PAGES</div>
        <ul className="link">
          <li><Link to={'/'}>Food & Travel</Link></li>
          <li><Link to={'/about'}>News & Trends</Link></li>
          <li><Link to={'/blogs'}>Heath & Beauty</Link></li>
          <li><Link to={'/contactus'}>Sports & Podcast</Link></li>
        </ul>
      </div>

      <div className="contact-info">
        <div className="title">CONTACT US</div>
        <div className="number">+91 635 456 77865</div>
        <div className="email">blogexpress@gmail.com</div>
      </div>
      
    </footer>
  )
}

export default Footer