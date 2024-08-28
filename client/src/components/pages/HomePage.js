import Navigation from "../Tools/NavBar";
import { Avatar, Button, Card, Tag, Tooltip } from 'antd';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { EllipsisOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';


const HomePage = () => {
  const token = localStorage.getItem('token');
  const [Users , setUsers] = useState([{}])
  const [allResume , setAllResume] = useState([{}])

  const navigate = useNavigate();
  const [searchedUsers , setSearchedUsers] = useState([])
  const [searchedUsersResume , setSearchedUsersResume] = useState([])

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
              setSearchedUsersResume(pervstate => [...pervstate , searchItem])

            }
          })
        })
      })
    }
  }
  const handleLogout = ()=>{
    localStorage.clear();
    navigate('/home');
    window.location.reload();
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setUsers(response.data)
    })
  },[])
  useEffect(()=>{
    Axios.get("http://localhost:3001/GetAllResume").then((response)=>{
      setAllResume(response.data)
    })
  },[])
  console.log(allResume)
  return (
    <div className="home w-full">
      <Navigation/>
      <div className="flex w-full">
        <div className="w-3/4 h-screen relative" dir="rtl">
          <div className="z-10 relative">
            <div className="searchbar w-[80%] h-10 flex  m-auto mt-5"> 
              <input type="text" onChange={handleSearch} className=" rounded-s-md outline-none w-full px-2" placeholder="جستجوی کاربران و رزومه ها..."/>
              <button 
                className="bg-blue-500 text-neutral-100 px-5 rounded-e-md hover:bg-blue-700 transition-all duration-300"
                onClick={searchHandler}
              ><FaSearch /></button>
            </div>
            {searchParam &&           
              <div className="bg-neutral-100 w-[80%] m-auto rounded-b-md p-5">
                {searchedUsers?.map((seus)=>{
                  return(
                    <>
                      <Link to={`/ShowUserInformation/${seus.bookmarkId}`}>
                        <div className="flex flex-col my-3 hover:bg-neutral-300 transition-all duration-300 p-3 rounded-md border-2 border-dashed border-neutral-300"
                        style={{fontFamily:"ComicSans , Negaar-Regular"}}
                        >
                          <div className="flex">
                            <Avatar size={64} icon={<FaRegUser />} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" shape="circle" className="border-2 border-solid border-neutral-200 bg-white" />
                            <div className="flex flex-col px-4 pt-2">
                              <h1 className="flex items-center text-2xl" >{seus.username}</h1>
                              <p className="text-sm">
                                <span>مدرک تحصیلی: </span>
                                <span>{seus.degree}</span>

                              </p>
                              <p className="text-sm">
                                <span>رشته تحصیلی: </span>
                                <span>                            
                                {
                                searchedUsersResume.map((eachUserResume) => {
                                  if (eachUserResume.usertokenref === seus.token) {
                                    return(
                                      <>
                                        {eachUserResume.fieldOfStudy}
                                      </>
                                    )
                                }
                                return null;
                              })
                            }</span>

                              </p>
                            </div>
                          </div>
                          <div className="pt-2 px-5">
                            <p className="text-sm">مهارت ها:</p>
                            {
                              searchedUsersResume.map((eachUserResume) => {
                                if (eachUserResume.usertokenref === seus.token) {
                                  return eachUserResume.skills.map((skill) => (
                                    <Tag color="volcano" key={skill}>{skill}</Tag>
                                  ));
                                }
                                return null;
                              })
                            }
                          </div>
                          <div className="px-5 py-2">
                            <p className="text-sm">گواهینامه ها :</p>
                            {
                              searchedUsersResume.map((eachUserResume) => {
                                if (eachUserResume.usertokenref === seus.token) {
                                  return eachUserResume.certifications.map((certi) => (
                                    <Tag color="cyan" key={certi}>{certi}</Tag>
                                  ));
                                }
                                return null;
                              })
                            }
                          </div>
                        </div>
                      </Link>
                    </>
                  )
                })}
              </div>
            }
          </div>
          <div className="w-full h-screen absolute top-20 p-4">
            <h1 
              style={{
                fontFamily:"Titr"
              }}
              className="text-4xl text-neutral-700"
            >
              <span>
                روزمه ها
              </span>
            </h1>
            <div className="flex flex-wrap gap-4 justify-center p-4 my-5 border-4 border-dashed border-neutral-400 rounded-md">
              {Users.map((user)=>{
                return(
                  <>
                    {user.act === "teacher" && 
                      <Card
                        style={{ width: 300 }}
                        cover={
                          <div
                            style={{
                              backgroundImage:`url(${user.ResumeCover? user.ResumeCover : "/images/Default_background_resume.jpg"})`
                            }}
                            className="bg-cover w-full h-40 bg-center"
                          >

                          </div>
                        }
                        actions={[
                          <Link to={`/ShowUserInformation/${user.bookmarkId}`}>
                            <Tooltip title="صفحه کاربر">
                              <UserOutlined key="user" />
                            </Tooltip>
                          </Link> ,
                          <Link to={`#`}>
                            <Tooltip title="مقاله ها">
                              <FileTextOutlined key="FileText" />
                            </Tooltip>
                          </Link> ,
                          <Link to={`#`}>
                            <Tooltip title="Develoing...">
                              <EllipsisOutlined key="ellipsis" />
                            </Tooltip>
                          </Link> ,
                          
                          
                        ]}
                      >
                        <Meta
                          avatar={<Avatar src={user.imageAddress? user.imageAddress : "/images/UserLogo.jpg"} />}
                          title={user.username}
                          description={
                            allResume.map((resumeuser)=>{
                              if(resumeuser.usertokenref === user.token){
                                return(resumeuser.fieldOfStudy?resumeuser.fieldOfStudy : user.degree)
                              }
                            })
                          }
                        />
                      </Card>
                    }
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="bg-yellow-300 w-1/4 h-full p-4" dir="rtl">
          <div className="bg-neutral-100 rounded-md h-36 w-full relative p-3">
          {Users.map((user)=>{
            return(
              <>
                {
                  user.token === token ?
                  <>
                    <div className="flex">
                      <div className="relative">
                        <span className="pulse z-10 w-4 h-4 bg-lime-500 absolute rounded-full"></span>
                        <Avatar 
                          size={64} 
                          icon={<FaRegUser />} 
                          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" 
                          shape="circle" 
                          className="border-2 border-solid border-neutral-200 bg-white"
                        />
                      </div>
                      <div className="w-full h-16 text-lg flex flex-col items-start pr-3 pt-2" style={{fontFamily:"ComicSans , Negaar-Regular"}}>
                        <h1>
                          {user.username}
                        </h1>
                        <p className="text-sm">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 w-full py-3">
                      <Button
                        style={{fontFamily:"Negaar-Regular"}}
                        type="primary"
                        danger
                        onClick={handleLogout}
                      >
                        خروج از حساب
                      </Button>
                      <Link to="/Dashboard">
                        <Button
                          style={{fontFamily:"Negaar-Regular"}}
                          type="primary"
                        >
                          داشبورد
                        </Button>
                      </Link>
                    </div>
                  </>
                  :
                  <span></span>
                }
              </>
            )
          })}
            {
              !token &&
              <>
              <div className="flex">
                <div className="relative">
                  <span className="z-10 w-4 h-4 bg-red-500 absolute rounded-full"></span>
                  <Avatar 
                    size={64} 
                    icon={<FaRegUser />} 
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" 
                    shape="circle" 
                    className="border-2 border-solid border-neutral-200 bg-white"
                  />
                </div>
                <div className="w-full h-16 text-lg flex flex-col items-start pr-3 pt-5" style={{fontFamily:"ComicSans , Negaar-Regular"}}>
                  <h1>
                    کاربر مهمان
                  </h1>
                </div>
              </div>
              <div className="flex justify-center gap-2 w-full py-3">
                <Link to="/Login">
                  <Button
                    block
                    size="large"
                    style={{fontFamily:"Negaar-Regular"}}
                    type="primary"
                  >
                    ورود به حساب کاربری
                  </Button>
                </Link>
              </div>
            </>
            }

          </div>
        </div>
        
      </div>
    </div>
      
  );
}

  export default HomePage;