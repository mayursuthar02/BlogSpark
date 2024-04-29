import React, { useContext, useEffect } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { Link } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";
import Loading from "../../Components/Loading/Loading";

const BlogList = ({ title, tags }) => {
  const { allBlogData, fetchAllBlogsData } = useContext(AuthContext);
  useEffect(()=> {
    fetchAllBlogsData();
  },[])

  if (!allBlogData || allBlogData.length === 0) {
    return <Loading />;
  }
  return (
    <div className="home_section_blogs">
      <div className="title">{title}</div>

      <div className="blogsList">
        {allBlogData
          .filter(blog => (tags === "top" ? true : blog.category === tags))
          .slice(0, 4)
          .reverse()
          .map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
      </div>

      <div className="see-more-btn">
        {allBlogData
          .filter(blog => (tags === "top" ? true : blog.category === tags)).length > 4 &&
          <Link to={tags === "top" ? "/blogs" : `/blogs/${tags}`} className="btn">Explore More</Link>}
      </div>  
    </div>
  );
};

export default BlogList;
