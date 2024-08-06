import Navigation from "../Tools/NavBar";
import { Button } from 'antd';
import { useEffect } from "react";
import { IoLogOut } from "react-icons/io5";


const HomePage = () => {
  const token = localStorage.getItem('token');

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload();

  }

    return (
      <div className="home">
        <Navigation/>
        <p>This is home page.</p>
        <p>user token : {token}</p>
        {
          token && 
          <Button type="primary" size="large" icon={<IoLogOut/>} onClick={handleLogout}>
            خروج
          </Button>
        }
      </div>
        
    );
  }

  export default HomePage;