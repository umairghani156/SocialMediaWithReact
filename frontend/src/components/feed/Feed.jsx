import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { AuthContext } from '../../context/AuthContext'
export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)
  console.log(user);
  console.log();
  useEffect(()=>{
    const fetchData =async ()=>{
      const res = username ?
      await axios.get("http://localhost:8800/api/posts/profile/" + username)
      : await axios.get(`http://localhost:8800/api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((firsPost, lastPost)=> new Date(lastPost.createdAt)- new Date(firsPost.createdAt)))
    }
    fetchData()
    console.log("posts", posts);
  },[username])
  console.log("user");
  return (
    <div className='feed'>
     
        <div className="feedWrapper">
         {(!username || username === user.username) &&<Share/>}
           {
            posts?.map((data)=>(
              <Post key={data._id} post={data}/>
            ))
           }
           
        </div>
    </div>
  )
}
