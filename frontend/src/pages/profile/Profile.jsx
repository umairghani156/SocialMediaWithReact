import './profile.css'
import HomeIcon from '@mui/icons-material/Home';
import TopBar from '../../components/topBar/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import CoverPic from "../../assets/post/3.jpeg"
import ProfilePic from "../../assets/person/7.jpeg";
import UserIcon from "../../assets/userImg.webp"
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../context/AuthContext';
import useUploadImage from '../../customHooks/useUploadImage';
export default function Profile({userInfo}) {
  
  const {user: currentUser, dispatch} = useContext(AuthContext)
  console.log("dispatch", dispatch);
  // console.log("currentUser",currentUser);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const descRef = useRef()
  const userNameRef = useRef()
  const emailRef = useRef()
  const cityRef = useRef()
  const fromRef = useRef()
  const relationRef = useRef()






  const [user, setUser] = useState({});
  const username = useParams().username;
  
 
  useEffect(()=>{
    const getUser =async ()=>{
      const res =await axios.get(`http://localhost:8800/api/users?username=${username}`);
      setUser(res.data)
      // console.log("data", res.data);
    }
    getUser()
  },[username])
 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 
// Update a User
const check =async () =>{

  
 // localStorage.setItem("user", JSON.stringify(getCurrentUser?.data.data))
}
check()
const updateHandler =async (e) =>{
  e.preventDefault()
  const updatePost = {
    userId: currentUser?._id,
    username: userNameRef.current.value ? userNameRef.current.value : currentUser?.username,
    email: emailRef.current.value ? emailRef.current.value : currentUser?.email,
    profilePicture: profile? profile : "",
    coverPicture: cover? cover : "",
    desc: descRef.current.value? descRef.current.value : "",
    city: cityRef.current.value? cityRef.current.value : currentUser?.city,
    from : fromRef.current.value ? fromRef.current.value : currentUser?.city,
    relationship: relationRef.current.value ? relationRef.current.value : "",

  }

  try{
    const updateUser = await axios.put(`http://localhost:8800/api/users/${currentUser?._id}`,updatePost);
     const getCurrentUser = await axios.get(`http://localhost:8800/api/users?userId=${currentUser?._id}`);
     console.log("getCurrentUser", getCurrentUser);
     const userData = getCurrentUser?.data;
     const replaceNameSpace = userData.username.replace(" ", "_")

    localStorage.setItem("user", JSON.stringify(getCurrentUser?.data))
    navigate(`/`)
    console.log("updateUser",updateUser);
    
  }catch(err){
    console.log(err);
  }
}
const profilePicHandler = async(proImg) =>{
  try{
    console.log("userFileImg", proImg);
      setLoading(!loading)
      const imgUrl = await useUploadImage(proImg, proImg.name)
      setProfile(imgUrl)

      console.log("profile", profile);
      setProfile(prevUrl => {
        console.log("Updated file state:", prevUrl); // This will log the updated state
        setLoading(false)
        return imgUrl;
      });
  }catch(err){
    console.log(err);
  }
}
const coverPicHandler =async (coverImg) =>{
  try{
    console.log("userFileImg", coverImg);
      setLoading2(!loading2)
      const coverImgUrl = await useUploadImage(coverImg, coverImg.name)
      setCover(coverImgUrl)

      console.log("profile", profile);
      setCover(prevUrl => {
        console.log("Updated file state:", prevUrl); // This will log the updated state
        setLoading2(false)
        return coverImgUrl;
      });
  }catch(err){
    console.log(err);
  }

}
 
  
  return (
    
    <>
      <TopBar />
      <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 1 }}>
            <form style={{display:"flex", flexDirection:"column", gap:"10px"}} onSubmit={updateHandler}>
              <div>
            <label htmlFor="username" >Username:</label>
            <input className='updateInputbar' style={{width:"100%"}}  type="text" name="" ref={userNameRef}  placeholder={currentUser?.username} id="username" />
            </div>
            <div>
            <label htmlFor="email" >Email:</label>
            <input className='updateInputbar' style={{width:"100%"}}  type="email" name="" ref={emailRef} placeholder={currentUser?.email} id="email" />
            </div>
            <label className='updateInputbar2' htmlFor="profilePic" style={{width:"100%", display:'flex', justifyContent:"space-between"}}>Change Profile Picture <span >{loading && <CircularProgress className='progressBar'  style={{ color:"blue"}}/>}</span></label>
            <input  style={{width:"100%",  display:"none"}} onChange={(e)=> profilePicHandler(e.target.files[0])}  type="file" name="" id="profilePic" />
            <label className='updateInputbar2' htmlFor="coverPicture" style={{width:"100%",  display:'flex', justifyContent:"space-between"}}>Change Cover Photo <span>{loading2 && <CircularProgress className='progressBar'  style={{ color:"blue"}}/>}</span></label>
            <input style={{width:"100%", display:"none"}} onChange={(e)=> coverPicHandler(e.target.files[0])}   type="file" name="" id="coverPicture" />
            <div>
            <label htmlFor="desc">Description:</label>
            <input className='updateInputbar' style={{width:"100%"}} ref={descRef}  type="text" name="" id="desc" />
            </div>
            <div>
            <label htmlFor="city">City:</label>
            <input className='updateInputbar' style={{width:"100%"}} ref={cityRef}  type="text" name="" id="city" />
            </div>
            <div>
            <label htmlFor="from">From:</label>
            <input className='updateInputbar' style={{width:"100%"}} ref={fromRef}  type="text" name="" id="from" />
            </div>
            <div>
            <label htmlFor="relation">Relationship:</label>
            <input className='updateInputbar' style={{width:"100%"}} ref={relationRef} type="text" name="" id="relation" />
            </div>
            <button className='updateProfile' type="submit">Update</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user?.coverPicture ? user?.coverPicture : CoverPic} alt="" className="profileCoverImg" />
              <img src={user.profilePicture || UserIcon} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <div className='profileInfo2'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className="profileinfoDesc">{user.desc || "hello"}</span>
              </div>
              <button onClick={handleOpen} className='updateButton'><span style={{fontSize:"15px"}}>Edit Profile</span> {<EditIcon style={{fontSize:"17px"}}/>}</button>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user}/>
          </div>
        </div>


      </div>
    </>
  )
}
