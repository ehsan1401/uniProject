import Navigation from "../Tools/NavBar";
import { Button } from 'antd';
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import Axios from 'axios'
import { FaSearch } from "react-icons/fa";


const HomePage = () => {
  const token = localStorage.getItem('token');
  const [Users , setUsers] = useState([{}])
  const [searchedUsers , setSearchedUsers] = useState([])
  const [searchParam , setSearchParam] = useState()


  const handleSearch = (e) => {
    setSearchParam(e.target.value)
  };
  const searchHandler = ()=>{
    setSearchedUsers([])
    if(searchParam){
      Axios.post(`http://localhost:3001/SearchItem/${searchParam}`).then((response)=>{
        const responseSearch = response.data ;
        Users.forEach((user)=>{
          responseSearch.forEach((searchItem)=>{
            if(searchItem.usertokenref === user.token){
              setSearchedUsers(pervstate => [...pervstate , user])
            }
          })
        })
      })
    }
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setUsers(response.data)
    })
  },[])

  return (
    <div className="home w-full">
      <Navigation/>
      <div className="flex w-full">
        <div className="bg-lime-300 w-3/4 h-screen" dir="rtl">
          <div className="searchbar w-[80%] h-10 flex  m-auto mt-5"> 
            <input type="text" onChange={handleSearch} className=" rounded-s-md outline-none w-full px-2" placeholder="جستجو کنید..."/>
            <button 
              className="bg-blue-500 text-neutral-100 px-5 rounded-e-md hover:bg-blue-700 transition-all duration-300"
              onClick={searchHandler}
            ><FaSearch /></button>
          </div>
          <p>{searchParam}</p>
          <p>hi there</p>
          <p>
            {searchedUsers?.map((seus)=>{
              return(
                <>
                  <p>{seus.username}</p>
                </>
              )
            })}
          </p>
        </div>
        <div className="bg-yellow-300 w-1/4 h-screen">

        </div>
        
      </div>
    </div>
      
  );
}

  export default HomePage;