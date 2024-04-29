import React, { useState } from 'react'
import categoriesListJSON from '../../Components/CategoriesListJSONFile/categoriesListJSON';
import { useNavigate } from 'react-router-dom';

const CategoriesList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (value) => {
    navigate(`/blogs/category/${value}`);
  };

  return (
    <>
          <div className='category' onClick={() => navigate('/blogs')}>All</div>
        {
            categoriesListJSON.map((data,index)=> (
                <div className='category' onClick={() => handleCategoryClick(data.value)}>{data.title}</div>
            ))
        }
    </>
  )
}

export default CategoriesList