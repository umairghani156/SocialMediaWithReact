
import Home from "./pages/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Profile from "./pages/profile/Profile"
import {BrowserRouter,
  Navigate,
Route,
Routes} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
function App() {
  const {user} = useContext(AuthContext)
  console.log(user);
  return(
    <BrowserRouter>
     <Routes>
         <Route path="/" exact element={user ? <Home/> : <Register/>}/> 
         <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/> 
         <Route path="/register" element={user ?<Navigate to="/"/> : <Register/>}/> 
         <Route path="/profile/:username" exact element={<Profile userInfo={user}/>}/> 
     </Routes>
    </BrowserRouter>
  )
}

export default App
