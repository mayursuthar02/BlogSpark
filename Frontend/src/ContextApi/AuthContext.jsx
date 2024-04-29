import { createContext, useState, useEffect } from "react";
import dummyBlogs from "../dummyBlog";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';  
import Loading from "../Components/Loading/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const [allBlogData, setAllBlogData] = useState(null)
  
  useEffect(() => {
    // setBlogData(dummyBlogs);
    fetchAllUserData(); // Fetch all user data
    fetchAllBlogsData()
    checkTokenExpiration(); // Check token expiration on component mount
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
      // fetchAllUserData();
      // fetchAllBlogsData();
    }
  }, [isLoggedIn]);

  // Fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch all user data
  const fetchAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/allusers", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch all user data");
      }
      const data = await response.json();
      setAllUserData(data);
    } catch (error) {
      console.error("Error fetching all user data:", error);
    }
  };


  // Fetch all blog data
  const fetchAllBlogsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch all blog data");
      }
      const data = await response.json();
      setAllBlogData(data);
    } catch (error) {
      console.error("Error fetching all blog data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Function to check if token is expired
  const checkTokenExpiration = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token is expired
          setIsLoggedIn(false); // Log out the user
          Cookies.remove("token"); // Remove the expired token
        }
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  };

  console.log(userData)
  console.log(allUserData)
  console.log(allBlogData)
  if (isLoading || !allUserData || !allBlogData) {
    return <Loading />; // Replace LoadingSpinner with your loading indicator component
  }

  return (
    <AuthContext.Provider
      value={{
        blogData: dummyBlogs, // Replace dummyBlogs with your actual blog data
        isLoggedIn,
        setIsLoggedIn,
        userData,
        allUserData,
        fetchAllUserData,
        allBlogData,
        fetchAllBlogsData,
        fetchUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
