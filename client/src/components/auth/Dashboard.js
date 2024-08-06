import { useEffect, useState } from "react";
import Navigation from "../Tools/NavBar";
import Axios from 'axios';
import { Button } from 'antd';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {

    const [UserInfo , setUserInfo] = useState({})
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/home');
        }
        Axios.get("http://localhost:3001/getUsers").then((response)=>{
        response.data.map((user)=>{
            if(user.token === token){
                setUserInfo(user);
            }
        })
        })
    },[])

    const handleLogout = ()=>{
        localStorage.clear();
        navigate('/home');
        window.location.reload();
        
    
      }

    return (
        <>
            <Navigation/>
            <div className="Dashboard flex flex-col justify-center items-center h-full w-full">
                <p className="">{UserInfo.username}</p>
                <p className="">{UserInfo.email}</p>
                <p className="">{UserInfo.password}</p>
                <p className="">{UserInfo.token}</p>
                <Button type="primary" size="large" icon={<IoLogOut/>} onClick={handleLogout}>
                    خروج
                </Button>
            </div>
        </>
        
    );
  }

  export default Dashboard;