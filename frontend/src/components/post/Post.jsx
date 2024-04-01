import './post.css'
import Pic_1 from "../../assets/person/1.jpeg"
import Post_1 from "../../assets/post/1.jpeg"
import UserIcon from "../../assets/userImg.webp";
import Like from "../../assets/like.png";
import Heart from "../../assets/heart.png"
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";



import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';
import SingleComments from '../comment/Comment';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [user, setUser] = useState({})
    const [inputText, setInputText] = useState("")
    const [isDisable, setIsDisable] = useState(true);
    const [isPost, setIsPost] = useState(false);
    const commentRef = useRef();
    const { user: currentUser, post:userPost, dispatch } = useContext(AuthContext);
    
   console.log("post",post);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [post.likes, currentUser._id])
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
            setUser(res.data)
        }
        getUser()
    }, [post.userId, userPost])

    const likeHandler = () => {
        try {
            axios.put(`http://localhost:8800/api/posts/${post._id}/like`, { userId: currentUser._id })
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }
   
    // Comment On posts
    console.log("currentUser", user);
    
    
     //Comment Input Handler
     const commentInputHandler = ()=>{
        if(commentRef.current.value.length < 2){
            setIsDisable(false)
        }
        setInputText(commentRef.current.value)
    }
    const commentHandler =async (userId) => {
        // const getUser = await axios.get(`http://localhost:8800/api/users?userId=${user._id}`)
        // console.log("getUser", getUser);
         const getCurrentUser =JSON.parse(localStorage.getItem("user"));
         console.log('getUser', getCurrentUser.profilePicture);
        const commentPost = await axios.put(`http://localhost:8800/api/posts/${userId}/comment`,{
            userId: currentUser?._id,
            text: commentRef.current.value,
           userPostName: getCurrentUser?.username,
           userPic: getCurrentUser?.profilePicture
        })
        console.log("commentPost", commentPost);
        dispatch({type:"SHOW_POST", payload: !userPost})
        setIsPost(!isPost)
        setIsDisable(!isDisable)
        setInputText("")
        console.log(commentRef.current.value);
        setIsDisable(!isDisable)
      
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture ? user.profilePicture : UserIcon} alt="" />
                        </Link>
                        <span className="postUserName">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)} </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={post?.img ? post?.img : ""} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={Like} alt="" />
                        <img className='likeIcon' src={Heart} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comments.length} comments</span>
                    </div>

                </div>
                <div className='likeButtons'>
                    <button className='likeAndCommentBtn' onClick={likeHandler}>{isLiked ? <AiFillLike style={{ color: "blue" }} /> : <AiOutlineLike />}Like</button>
                    <button className='likeAndCommentBtn' onClick={() => setIsComment(!isComment)}><FaRegComment />Comment</button>
                    <button className='likeAndCommentBtn'><IoIosShareAlt />Share</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div>
                       
                       {isComment && post?.comments.map((com, ind)=>(
                           <SingleComments key={com.userId}  post={post} com={com} user={user} currentUser={currentUser}/>
                       )) }
                       <div className="commentsBar">
                <Link to={`profile/${user.username}`}>
                    <img className='postProfileImg' src={currentUser.profilePicture ? currentUser.profilePicture : UserIcon} alt="" />
                </Link>
                <div className='commentbar'>
                    <input className='commentInputBar' ref={commentRef} value={inputText} type="text" onChange={commentInputHandler} />
                    <button className='commentButton' disabled={isDisable} onClick={() => commentHandler(post?._id)}>{isDisable ? <IoMdSend style={{ color: "black" }} /> : <IoMdSend style={{ color: "blue" }} />}</button>
                </div>
            </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
