import Person_pic from "../../assets/person/3.jpeg"
import "./online.css"
export default function Online({user}) {
    console.log("user", user);
  return (
    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            
                                <img className="rightbarProfileImg" src={user?.profilePicture} alt="" />
                                <span className="rightbarOnline"></span>
                            
                        </div>
                            <span className="rightbarUsername">{user?.username}</span>
                    </li>
   
  )
}
