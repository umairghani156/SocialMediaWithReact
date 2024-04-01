import "./rightbar.css"
import BirthdayPic from "../../assets/gift.png"
import AdPic from "../../assets/ad.png"
import axios from "axios"
import { Users } from "../../DummyData"
import Online from "../online/Online"
import UserImg1 from "../../assets/person/1.jpeg"
import UserImg2 from "../../assets/person/2.jpeg"
import UserImg3 from "../../assets/person/3.jpeg"
import UserImg4 from "../../assets/person/4.jpeg"
import UserImg6 from "../../assets/person/6.jpeg"
import UserImg7 from "../../assets/person/8.jpeg"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { Add, Remove } from "@mui/icons-material"

const Rightbar = ({user}) => {
    const { user:currentUser,isShow,friends: showFriends, dispatch } = useContext(AuthContext);
    console.log("userId", currentUser?._id);
    console.log("user._id",user?._id);
    console.log("friends", showFriends);


    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))
    console.log(followed);
    console.log(user?._id);
    useEffect(()=>{
      setFollowed(currentUser.followings.includes(user?.id));
    },[currentUser, user?._id])
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`http://localhost:8800/api/users/friends/${user?._id}`);
                setFriends(friendList.data)
            } catch (err) {
                console.log(err);
            }
        }
        getFriends()
    }, [user?._id, followed, showFriends, isShow])
    // follow a user
    const followUser =async () =>{
        try{
            if(followed){
             await axios.put(`http://localhost:8800/api/users/${user?._id}/unfollow`,{userId:currentUser?._id});
             dispatch({type:"UNFOLLOW", payload: user?._id})
            }else{
            await axios.put(`http://localhost:8800/api/users/${user?._id}/follow`,{userId:currentUser?._id});
            dispatch({type:"FOLLOW", payload: user?._id})

            }
            // Refetch friends list after follow/unfollow
        const friendList = await axios.get(`http://localhost:8800/api/users/friends/${user?._id}`);
        setFriends(friendList?.data);
        }catch(err){
            console.log("err", err.response ? err.response.data : err.message);
        }
        setFollowed(!followed)
    }
    const HomeRightBar = () => {
        return (
            <>
            { showFriends ?
            <div>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={BirthdayPic} alt="" />
                    <span className="birthdayText">
                        <b>Yasir</b> and <b> 2 other friends </b>have a birthday today
                    </span>
                </div>
                <img className="rightbarAd" src={AdPic} alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users?.map((u) => (
                            <Online key={u.id} user={u} />
                        ))
                    }
                </ul>
            </div> : ""
    }
            </>
                
        )
    }
    const ProfileRightBar = () => {
        return (
            <div className="profileRightBarInfo">
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={followUser}>
                    {followed ? "Unfollow": "Follow"}
                    {followed ? <Remove/>: <Add/>}

                </button>
                
            )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {
                        friends.map((friend) => (
                            <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration:"none"}}>
                                <div className="rightbarFollowing">
                                    <img src={friend?.profilePicture ? friend.profilePicture : UserImg1} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
    console.log("userHey", user);
    return (
        <>
        {showFriends ?
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div> : ""
}
        </>
    )
}

export default Rightbar;