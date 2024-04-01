import { useContext, useRef } from 'react';
import'./login.css'
import { logincall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user,isFetching, error, dispatch} = useContext(AuthContext)
    const handleClick =async (e)=>{
        e.preventDefault()
        const userLogin = await axios.post(`http://localhost:8800/api/auth/login`, {email: email.current.value, password: password.current.value})
        localStorage.setItem("user", JSON.stringify(userLogin.data))
        logincall({email: email.current.value, password:password.current.value},dispatch)
    };
    console.log(user);
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
                <form className="loginBox" onSubmit={handleClick} >
                    <input type='email' required ref={email} placeholder='Email' className="loginInput"  />
                    <input type='password' required ref={password} minLength="6" placeholder='password' className="loginInput" />
                    <button type='submit' className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress style={{fontSize:"15px ", color:"white"}}/>: "Log In"}</button>
                     <span className="loginForgot">Forgot Password?</span>
                     
                </form>
                <Link to={"/register"} style={{textAlign:"center"}}>
                <button className="loginRegisterButton">
                        {
                            isFetching ? (
                                <CircularProgress style={{fontSize:"15px ", color:"white"}}/>
                            ) : "Create a New Account"
                        }
                        
                     </button>
                </Link>
            </div>
        </div>
    </div>
  )
}
