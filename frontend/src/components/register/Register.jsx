import { useRef } from 'react'
import'./register.css'
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()
  const signUpHandle = async (e) =>{
    e.preventDefault();
   if(passwordAgain.current.value !== password.current.value){
    passwordAgain.current.setCustomValidity("Password don't match")
   }else{
    const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value, 
    };
    try{
        const registerUser = await axios.post("http://localhost:8800/api/auth/register", user)
        localStorage.setItem("user", JSON.stringify(registerUser.data))
        navigate("/login")
    }catch(err){
        console.log(err);
    }
   }

  }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Media</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on social media
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={signUpHandle}>
                    <input ref={username} required type='text' placeholder='Username' className="loginInput" />
                    <input ref={email} required type='email' placeholder='Email' className="loginInput" />
                    <input ref={password} minLength="6" required type='password' placeholder='Password' className="loginInput" />
                    <input ref={passwordAgain} required type='password' placeholder='password Again' className="loginInput" />
                    <button className="loginButton" type="submit">Sign Up</button>
                     
                </form>
                <Link to={"/login"} style={{textAlign:"center"}}>
                <button className="loginRegisterButton">
                        Log into Account
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}
