import "./home.css";
import NavBar from '../../components/navBar/NavBar';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

// import "./sidebar.css";
// export default function Online(){
//   return (
//     <div>

//     </div>

//   )
// }