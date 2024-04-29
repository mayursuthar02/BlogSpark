import React from "react";
import CategoriesData from "../../Components/CategoriesListJSONFile/categoriesListJSON";

const CategoriesList = ({
  setSelectCategories,
  setCategoriesList,
  categoriesList,
}) => {
  const handleCategoryChange = (category) => {
    if (categoriesList.includes(category)) {
      // If the category is already in the list, remove it
      setCategoriesList(categoriesList.filter((cat) => cat !== category));
    } else {
      // If the category is not in the list, add it
      setCategoriesList([...categoriesList, category]);
    }
  };

  const handleDoneButtonClick = () => {
    console.log(categoriesList); // Log the categoriesList when the "Done" button is clicked
    setSelectCategories(false);
  };

  return (
    <div className="categories">
      <div className="categoriesList">
        {CategoriesData.map((category, index) => (
          <div
            className={`category-button ${
              categoriesList.includes(category.value) ? "checked" : ""
            }`}
            key={index}
            onClick={() => handleCategoryChange(category.value)}
          >
            {category.title}
          </div>
        ))}
      </div>

      <div className="donebtn" onClick={handleDoneButtonClick}>
        Done
      </div>
    </div>
  );
};

export default CategoriesList;
