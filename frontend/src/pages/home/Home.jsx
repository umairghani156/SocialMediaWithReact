import HomeIcon from '@mui/icons-material/Home';
import TopBar from '../../components/topBar/TopBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./home.css"
const Home = () =>{
   
    return(
        <>
           <TopBar/>
           <div className="homeContainer">
             <Sidebar/>
             <Feed/>
             <Rightbar/>

           </div>
        </>
    )
}

export default Home;