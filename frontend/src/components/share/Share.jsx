import "./share.css"
import UserIcon from "../../assets/userImg.webp";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import CircularProgress from '@mui/material/CircularProgress';

import Pic_person_3 from "../../assets/person/1.jpeg"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
import useUploadImage from "../../customHooks/useUploadImage";
export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const postHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img: file? file : "",
    }
    try {
      await axios.post("http://localhost:8800/api/posts", newPost)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }
  const uploadImg = async (userFileImg) => {
    try {

      console.log("userFileImg", userFileImg);
      setLoading(!loading)
      const imgUrl = await useUploadImage(userFileImg, userFileImg.name)
      setFile(imgUrl)

      console.log("file", file);
      setFile(prevUrl => {
        console.log("Updated file state:", prevUrl); // This will log the updated state
        setLoading(false)
        return imgUrl;
      });
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(()=>{
  //       console.log("file", file);
  //     // file &&  useUploadImage(file.name)
  // },[file])
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture : UserIcon} alt="" />
          <input ref={desc} placeholder={"What's on your mind," + user.username + "?"} className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div style={{textAlign:"center"}}>
          {
            loading && <CircularProgress/>
          }
        </div>
        {
          file && (
            <div className="shareImgContainer">
                <img className="shareImg" src={file ? file : ""} alt="" />
                <Cancel className="shareCancelImg" onClick={()=> setFile(null)}/>
            </div>
          )
        }
        <form className="shareBottom" onSubmit={postHandler}>
          <div style={{margin:"1px auto"}}>
          {
           
          }
          </div>
          <div className="shareBottom2">
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => uploadImg(e.target.files[0])} />
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  )
}
