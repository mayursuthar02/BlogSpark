import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../ContextApi/AuthContext";
import Loading from "../../Components/Loading/Loading";
import BlogCard from "../../Components/BlogCard/BlogCard";

const FavouritePage = () => {
  const { userData } = useContext(AuthContext);
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) return; // Return early if userData is null

      try {
        const response = await fetch(
          `http://localhost:5000/user/favourite/blogs/${userData.id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setBlogsData(data.blogs);
        } else {
          console.log("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!userData || !blogsData) {
    return <Loading />;
  }

  return (
    <div className="favourite_section">
      <div className="blogs-list">
        {blogsData?.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
