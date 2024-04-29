import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";
import Loading from "../../Components/Loading/Loading";
import BlogCard from "../../Components/BlogCard/BlogCard";
import CategoriesList from "./CategoriesList";

const BlogsPage = () => {
  const { category } = useParams();
  const { allBlogData,fetchAllBlogsData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    // Set loading to true when category changes
    fetchAllBlogsData();
    setLoading(true);

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Clear the timeout on unmount or when category changes

  }, [category]);

  if (!allBlogData || loading) {
    return <Loading />;
  }
  
  const filteredBlogs = category
    ? allBlogData.filter((blog) => blog.category === category)
    : allBlogData;

  return (
    <div className="Blogs_Section">
      <div className="categories_List">
        <CategoriesList />
      </div>

      <div className="blogsList">
        {filteredBlogs.length === 0 ? (
          <p className="blog_not_found">No blogs found.</p>
        ) : 
        (
          !showMore ? 
          (filteredBlogs.slice(0,12).reverse().map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          )) ) : 
          (filteredBlogs.reverse().map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          )))
        )}
      </div>

      {filteredBlogs.length > 12 && <div className="show-more-btn">
        <button onClick={()=> setShowMore(!showMore)}>{!showMore ? 'Show more' : 'Show less'}</button>
      </div>}
    </div>
  );
};

export default BlogsPage;
