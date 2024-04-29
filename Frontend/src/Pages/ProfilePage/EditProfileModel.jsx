import React, { useState } from 'react'
import editIcon from '../../assets/Icon/edir-2.png'
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditProfileModel = ({userData, setIsShow}) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(`http://localhost:5000/userImg/${userData.profileImg}`)
  const [coverImg, setCoverImg] = useState(`http://localhost:5000/userImg/${userData.coverImg}`)
  const [pImg, setPImg] = useState("")
  const [cImg, setCImg] = useState("")
  const [fullName, setFullName] = useState(userData.fullName)
  const [username, setUsername] = useState(userData.username)
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(userData.email)
  console.log(userData.id)

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
  
  
  const handleProfileImg = (e) => {
    setPImg(e.target.files);
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result); // Set profileImg state to the data URL of the selected file
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };
  
  const handleCovereImg = (e) => {
    setCImg(e.target.files);
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImg(reader.result); // Set profileImg state to the data URL of the selected file
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  const handleSubmit = async (e) => {
    console.log(cImg)
    console.log(pImg)
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    if (pImg && pImg.length > 0) {
      formData.append("profileImg", pImg[0]);
    }
    if (cImg && cImg.length > 0) {
      formData.append("coverImg", cImg[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/update/images/${userData.id}`, {
        method: 'PUT',
        body: formData
      })
      const data = await response.json();
      if (response.ok) {
        showSucessToast("Profile updated");
        console.log(data);
        navigate(`/profile/${username}`)
      } else {
        showErrorToast("Error to update");
      }
    } catch (error) {
      console.log(error)
    }
    setIsShow(false); 
    setCImg('')
    setPImg('')
    setFullName('')
    setUsername('')
    setEmail('')
    setBio('')
  }

  return (
    <div className='edit_profile_section'>

      <div className="title">Edit Profile</div>

      <form onSubmit={handleSubmit}>

        <div className="cover-img">
          {coverImg && <img src={coverImg} alt="" /> }
          <div className="input-btn">
            <input type="file" onChange={handleCovereImg} />
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="profile-img">
          <div className="img-wrapper">
            {profileImg && <img src={profileImg} alt="" /> }
          </div>
          <div className="input-btn">
            <input type="file" onChange={handleProfileImg} />
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="">FullName</label>
          <input type="text" placeholder='FullName' value={fullName} onChange={e => setFullName(e.target.value)}/>
        </div>
        <div className="input-field">
          <label htmlFor="">Username</label>
          <input type="text" placeholder='@username'value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="input-field">
          <label htmlFor="">Email</label>
          <input type="text" placeholder='example@gmail.com' value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="input-field">
          <label htmlFor="">Bio</label>
          <textarea type="text" placeholder='bio here...' value={bio} onChange={e => setBio(e.target.value)}/>
        </div>
            
        <div className="btns">
          <button className="btn">Save</button>
          <div className="btn" onClick={()=> setIsShow(false)}>Close</div>
        </div>

      </form>

    </div>
  )
}

export default EditProfileModel