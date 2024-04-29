import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, setIsLoading }) => {
  const { _id, title, summary, category } = blog;
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });
  return (
    <div className="blog-details-blog-list">
      <div className="title-category">
        <Link to={`/blog-detail/${_id}`} onClick={()=> setIsLoading(true)} className="title">
          {title}
        </Link>
        <p className="category">{category}</p>
      </div>
      <p className="desc">{summary.length > 70 ? `${summary.slice(0, 70)}...` : summary}</p>
      <p className="date">{formattedDate}</p>
    </div>
  );
};

export default BlogCard;
