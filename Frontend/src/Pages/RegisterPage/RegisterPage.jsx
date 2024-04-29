import React, { useState } from 'react'
import CategoriesList from './CategoriesList'
import { toast,Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate();
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
  
  const [selectCategories, setSelectCategories] = useState(false)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [categoriesList, setCategoriesList] = useState([])
  const [password, setPassword] = useState("")
  const [cpassword, setCPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username==''||email==''||categoriesList==''||password==''||cpassword=='') { 
      showErrorToast("Please enter your details!!");
      return;
    }
    if(password !== cpassword) { 
      showErrorToast("Password doesn't match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({fullName,username,email,password,categoriesList})
      })
      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        showSucessToast(data.message)
        navigate('/login');
      } else {
        // alert(data.error);
        showErrorToast(data.error)
      }
    } catch (error) {
      // alert("Registerd Error");
      showErrorToast("Registerd Error")
      console.log("Registred Error : ",error);
    }
  }

  return (
    <div className='login-signup-section'>
      <div className="form-section">
        <div className="signup-title">
          <h3 className="title">Create an Account</h3>
          <p className="subtitle">Please enter your details</p>
        </div>

        <form className='form' onSubmit={handleSubmit}>

          <div className="input-field">
            <label htmlFor="">Fullname</label>
            <input type="text" placeholder='FullName' value={fullName} onChange={e => setFullName(e.target.value)}/>
          </div>

          <div className="input-field">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='@username' value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="">Email</label>
            <input type="email" placeholder='example@gmail.com' value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="">Select you preferences categories</label>
            <div className="select-preferences" onClick={() => setSelectCategories(true)}>Select</div>
          </div>

          { selectCategories && <CategoriesList setSelectCategories={setSelectCategories} setCategoriesList={setCategoriesList} categoriesList={categoriesList}/> }

          <div className="input-field">
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>

          <div className="input-field">
            <label htmlFor="">Confirm Password</label>
            <input type="password" placeholder='Please confirm password' value={cpassword} onChange={e => setCPassword(e.target.value)}/>
          </div>

          <button className="submitbtn">Create Now</button>
        </form>

          <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </div>

    </div>
  )
}

export default RegisterPage