import './closefriend.css'
import Pic_2 from "../../assets/person/2.jpeg"

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
                    <img src={user?.profilePicture} className="sidebarFriendImg" alt="" />
                    <span className="sidebarFriendNAme">{user?.username}</span>
                </li>
  )
}
