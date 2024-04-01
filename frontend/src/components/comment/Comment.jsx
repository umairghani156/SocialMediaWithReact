import { useContext, useRef, useState } from "react";
import "./comment.css"
import { AuthContext } from "../../context/AuthContext";
import UserIcon from "../../assets/userImg.webp";

const SingleComments = ({ user, post, com }) => {
    const {user: currentUser, dispatch} = useContext(AuthContext)
   console.log("comment", com);
   
    return (
        <>
            <div className="userComments" >
                <img className='postProfileImg' src={com.userPic ? com.userPic  : UserIcon} alt="" />
                <div className="userNameWithComment">
                    <p><b>{com?.userPostName}</b></p>
                    <p>{com?.text}</p>
                </div>
            </div>
            
        </>
    )
}

export default SingleComments;