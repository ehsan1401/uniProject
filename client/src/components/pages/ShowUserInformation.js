import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Navigation from "../Tools/NavBar";
import { Button, ConfigProvider, Divider } from "antd";
import { CgFileDocument } from "react-icons/cg";
import { RiFileUserLine } from "react-icons/ri";

const ShowUserInformation = () => {
    const [Users , setUsers] = useState()
    const [allUserResume , setAllUserResume] = useState()

    useEffect(()=>{
        Axios.get("http://localhost:3001/getUsers").then((response)=>{
          setUsers(response.data)
        })
      },[])

      useEffect(()=>{
        Axios.get("http://localhost:3001/GetAllResume").then((response)=>{
            setAllUserResume(response.data)
        })
      },[])

    const { userBookmarkId } = useParams();

    return (
        <>
            <Navigation/>
            {Users?.map((User)=>{
                if(User.bookmarkId === userBookmarkId){
                    return(
                        <>
                            <div className="w-full h-screen flex flex-col">
                                <div className="flex h-96">
                                    <div 
                                        className="w-2/3 h-full p-5 overflow-hidden relative"

                                    >
                                        <div
                                            className="w-full h-full bg-cover bg-center rounded-xl transform duration-300" 
                                            style={{backgroundImage : `url("${User.ResumeCover ? `http://localhost:3001/cover/${User?.ResumeCover}` : '/images/Default_background_resume.jpg'}")` , filter: 'blur(2px)'}}
                                        >
                                        </div>
                                        {
                                            User.act === 'teacher' ?
                                        <div className="absolute top-[17vh] right-[31%] m-auto bg-neutral-700 bg-opacity-80 rounded-lg p-5 text-neutral-50">
                                            <h1
                                                className="text-lg"
                                                style={{fontFamily:"Vanilla"}}
                                            >
                                                <span>
                                                    برای مشاهده مقاله ها یا روزمه کاربر کلیک کنید
                                                </span>
                                            </h1>
                                            <Divider solid style={{borderColor:"#ffffff"}}></Divider>
                                            <div className="flex gap-3 justify-center">
                                                <ConfigProvider
                                                theme={{
                                                    token: {
                                                    colorPrimary: '#4CAF50',
                                                    fontFamily:"Negaar-Bold"
                                                    },
                                                }}
                                                >
                                                <Button
                                                    type="primary"
                                                    icon={<RiFileUserLine/>}

                                                >
                                                    <span>
                                                        رزومه
                                                    </span>
                                                </Button>
                                                </ConfigProvider>
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                        colorPrimary: '#E3B646',
                                                        fontFamily:"Negaar-Bold"
                                                        },
                                                    }}
                                                >
                                                <Button
                                                    type="primary"
                                                    icon={<CgFileDocument/>}

                                                >
                                                    <span>
                                                        مقاله ها
                                                    </span>
                                                </Button>
                                                </ConfigProvider>

                                            </div>
                                            
                                        </div>
                                        :
                                        <div className="absolute top-[17vh] right-[31%] m-auto bg-neutral-700 bg-opacity-80 rounded-lg p-5 text-neutral-50">
                                            <h1>
                                                hello mother Fucker!
                                            </h1>
                                        </div>

                                        }
                                    </div>
                                    <div className="w-1/3 h-full flex flex-col justify-center items-center px-1">
                                        <div 
                                            className="image w-40 h-40 bg-neutral-400 bg-cover rounded-full bg-center hover:scale-110 duration-200" 
                                            style={{
                                                backgroundImage : `url(${User.imageAddress ? `http://localhost:3001/images/${User?.imageAddress}` : '/images/UserLogo.jpg'})`
                                            }}
                                        ></div>
                                        <Divider style={{  borderColor: '#7cb305' }}>
                                        <h1 className="text-4xl py-2" style={{
                                            fontFamily:"ComicSans , koodak"
                                        }}>{User.username}</h1>
                                        </Divider>
                                        <h1 style={{
                                            fontFamily:"ComicSans"
                                        }}>{User.email}</h1>
                                        <h1 style={{
                                            fontFamily:"Negaar-Regular"
                                        }}>{User.degree}</h1>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-blue-600 h-60">
  
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            })}
        </>
    );
  }

  export default ShowUserInformation;