import Navigation from "../Tools/NavBar";
import { Button } from 'antd';
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import Axios from 'axios'

const HomePage = () => {
  const token = localStorage.getItem('token');
  const [Users , setUsers] = useState([{}])



  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setUsers(response.data)
    })
  },[])

    return (
      <div className="home w-full">
        <Navigation/>
        <div className="flex w-full">
          <div className="bg-lime-300 w-3/4 h-screen">

          </div>
          <div className="bg-yellow-300 w-1/4 h-screen">

          </div>
          
        </div>
      </div>
        
    );
  }

  export default HomePage;