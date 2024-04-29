import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/Images/Logo.png";
import searchIcon from "../../assets/Icon/search.png";
import downArrow from "../../assets/Icon/down arrow.png";
import profileAvtar from "../../assets/Images/Avtar Profile.jpg";
import AuthContext from "../../ContextApi/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isLoggedIn,userData } = useContext(AuthContext);
  const [query, setQuery] = useState("")
  const headerRef = useRef(null);
  const timeoutRef = useRef(null);
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const handleSearch = async (e) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);
  
    // Clear the previous timeout
    clearTimeout(timeoutRef.current);
  
    // Set a new timeout
    timeoutRef.current = setTimeout(async () => {
      try {
        // Make a GET request to the search API endpoint with the query
        const response = await fetch(`/api/blogs/search?query=${encodeURIComponent(inputQuery)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log(data);
        } else {
          console.log('Network response was not ok')
        }
      } catch (error) {
        console.error("Error searching:", error);
      }
    }, 300);
  };
  
  return (
    <header className="header-section" ref={headerRef}>
      <nav>
        {/* Logo */}
        <Link to={"/"} className="logo-section">
          <div className="logo">
            <img src={logo} alt="Blogify Logo" />
          </div>
          <h3 className="name">BlogSpark</h3>
        </Link>

        <div className="search-section">
          {/* .search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search blog..." onChange={handleSearch} value={query}/>
            <div className="search-icon">
              <img src={searchIcon} alt="Search Icon" title="Search" />
            </div>
          </div>

          {/* .searchSuggestion */}
          {/* <div className="search-suggestion-bar"></div> */}
        </div>

        {/* Nav link */}
        <div className="navlinks-and-button">
          <ul className="nav-links">
            <li title="Home">
              <Link to={"/"}>Home</Link>
            </li>
            <li title="Blogs">
              <Link to={"/blogs"}>Blogs</Link>
            </li>
            <li title="About">
              <Link to={"/about"}>About</Link>
            </li>
            <li title="ContactUs">
              <Link to={"/contactus"}>ContactUs</Link>
            </li>
            {isLoggedIn && 
              <li title="Favourite">
              <Link to={"/favourite"}>Favourite</Link>
              </li>
            }
          </ul>

          {!isLoggedIn ? (
            <div className="buttons">
              <Link to={"/login"} className="btn" title="Login">
                Login
              </Link>
              <Link to={"/register"} className="btn" title="SignUp">
                SignUp
              </Link>
            </div>
          ) : (
            <Link to={`/profile/${userData?.username}`} className="profile-button">
              <div className="profile-icon">
              {userData?.profileImg ? (<img src={`http://localhost:5000/userImg/${userData.profileImg}`} alt="Profile Image" />) : (<img src={profileAvtar} alt="Profile Image" />)}
              </div>
              <h2 className="profile-user-name">{userData?.username}</h2>
              <div className="arrow-icon">
                <img src={downArrow} alt="arrow" />
              </div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
