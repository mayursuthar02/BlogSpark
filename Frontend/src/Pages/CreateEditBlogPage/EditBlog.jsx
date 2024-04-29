import React, { useContext, useEffect, useState, useCallback } from "react";
import categoriesList from "../../Components/CategoriesListJSONFile/categoriesListJSON";
import downArrow from "../../assets/Icon/down-arrow-1.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../../Components/Loading/Loading";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthContext";

// React Quill Tool
var toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["clean", "link", "image"]
];

const WriteBlogPage = () => {
  const {id} = useParams();
  const {userData,allBlogData,fetchAllBlogsData} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Input value
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [blogId, setBlogId] = useState("")

  // Menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // For Toast
  const showSucessToast = (message) => {
    toast.success(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const showErrorToast = (message) => {
    toast.error(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

    // Memoized fetchAllUserData function
    // const memoizedFetchAllUserData = useCallback(fetchAllBlogsData, []);

    useEffect(() => {
        const fetchData = async () => {
          await fetchAllBlogsData();
          setLoading(false); // Since we're done loading after fetching data
        };
        setLoading(true); // Start loading
        fetchData();
        console.log(allBlogData)
    }, []);
    
    useEffect(() => {
        console.log(allBlogData)
        const blog = allBlogData?.find((blog) => blog._id === id);
        if (blog) {
          setTitle(blog.title);
          setSummary(blog.summary);
          setSelectedOption(blog.category);
          setSelectedOptionValue(blog.category);
          setContent(blog.content);
          setTags(blog.tags);
          setBlogId(blog._id);
        }
      }, [allBlogData, id]);


  if (loading && !userData && !allBlogData) {
    return <Loading />;
  }

  // Select option btn Handing
  const handleOptionSelect = (option, title) => {
    setSelectedOption(title);
    setSelectedOptionValue(option);
    setIsOpen(false);
  };

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("category", selectedOptionValue);
    formData.append("content", content);
    formData.append("tags", tags);
    // Append the file to FormData if selected
    if (files && files.length > 0) {
      formData.append("file", files[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/update/blog/${blogId}`, {
        method: 'PUT',
        body: formData
      })
      const data = await response.json();
      if (response.ok) {
        showSucessToast("Blog updated.");
        navigate(`/blog-detail/${blogId}`)
        console.log(data);
      } else {
        showErrorToast("Error to create a blog");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="writeBlog_section">
      <h3 className="title">Edit Your Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="text-field">
          <label>Title :</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="text-field">
          <label>Summary :</label>
          <input
            type="text"
            placeholder="Summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="img-menu">
          <div className="file-input">
            <input
              type="file"
              className="image-select"
              onChange={(e) => setFiles(e.target.files)}
            />
            <div className="file-input-btn">Choose File</div>
          </div>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={toggleMenu}>
              {selectedOption ? selectedOption : "Select category"}
              <img src={downArrow} alt="" />
            </div>
            <ul className={isOpen ? `open dropdown-menu` : `dropdown-menu`}>
              {categoriesList.map((category, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleOptionSelect(`${category.value}`, `${category.title}`)
                  }
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-field">
          <label>Content :</label>
          <ReactQuill
            className="mainContent-input"
            theme="snow"
            modules={{ toolbar: toolbarOptions }}
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
        </div>

        <div className="text-field">
          <label>Tag :</label>
          <input
            type="text"
            placeholder="e.g. #travel #food"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button className="create-blog-btn">Edit Blog</button>
      </form>
    </div>
  );
};

export default WriteBlogPage;
