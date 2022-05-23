import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link,useNavigate } from 'react-router-dom'
import Logo from "../asset/logo.svg"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'


const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword:'',
  })

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  })
  
  const toastOption ={
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email, username } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });
    
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/")
      }     
    };  
  }

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be the same.",toastOption )
      return false;
    } else if (username.length <= 3) {
      toast.error("Username should be greater than or equal 3 characters",toastOption)
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Please input the email",toastOption)
    }
    return true;
  }

  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }

  return (
    <>
    <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
      </FormContainer>
      <ToastContainer/>
  </>
);
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    @media (max-width:768px) {
      img {
        height: 2rem;
      }
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2rem;
    }
    @media (max-width:768px) {
      h1 {
        font-size: 2rem;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  @media (max-width:768px){
    margin-bottom: 11rem
  } 
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
  }
    button {
      background-color: #997af0;
      padding: 1rem 2rem;
      border: 0.1rem solid transparent;
      border-radius: 0.5rem;
      transition: transform 450ms;
      color: white;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        transform: scale(1.08);
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      margin-top: 0.2rem;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
}
  

`;

export default Register