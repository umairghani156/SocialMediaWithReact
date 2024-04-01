
import { Person, Chat, Notifications } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import "./topBar.css"
import { Button, Dropdown } from 'antd';
import { FaBars } from "react-icons/fa";


import Pic_1 from "../../assets/person/1.jpeg"
import UserIcon from "../../assets/userImg.webp"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
const TopBar = () => {
  const navigate = useNavigate()
  const { user,isShow,friends, dispatch } = useContext(AuthContext)
  console.log("friends", friends);
  const signOutHandler = () => {
    console.log("Running");
    localStorage.removeItem("user");
    window.location.reload()
    navigate("/login")
  }
  const showFriendsHandler = ()=>{
    console.log("Friends hey");
    dispatch({type: "SHOW_FRIENDS", payload: !friends})
    console.log("friends",friends);
  }
  const items = [
    {
      key: '1',
      label: (
        <Link to={"/"}>
          Home
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={`/profile/${user.username}`}>
          Profile
        </Link>
      ),
    },
    {
      key: '3',
      label: "Sign Out",
      onClick: signOutHandler,
     
    },
    {
      key: '4',
      label: "Friends",
      onClick: showFriendsHandler,
     
    },
  ];
  const showHiddenLeftbar =()=>{
   dispatch({type:"SHOW_LEFTBAR", payload: !isShow})
   console.log("isshow", isShow);
  }
  console.log("pro", user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo" >Social Media</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem" style={{display:"flex", alignItems:"center"}}>
            <FaBars className="fabarsIcon" style={{fontSize:"20px"}} onClick={showHiddenLeftbar}/>
          </div>
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>


        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <img src={user.profilePicture ? user.profilePicture : UserIcon} alt="" className="topbarImg" />
        </Dropdown>

      </div>
    </div>
  )
}

export default TopBar;