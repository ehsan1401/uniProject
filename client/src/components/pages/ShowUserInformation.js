import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Navigation from "../Tools/NavBar";
import { Button, ConfigProvider, Divider, Modal } from "antd";
import { CgFileDocument } from "react-icons/cg";
import { RiFileUserLine } from "react-icons/ri";
import { VscCircleFilled } from "react-icons/vsc";



const ShowUserInformation = () => {
    const [Users , setUsers] = useState()
    const [allUserResume , setAllUserResume] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

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
                            
                            <ConfigProvider
                                theme={{
                                    components: {
                                    Modal: {
                                        titleFontSize:30,
                                        fontFamily:"Titr"
                                    },
                                    },
                                }}
                            >
                                <Modal 
                                    title="روزمه کاربر" 
                                    open={isModalOpen} 
                                    onOk={handleOk} 
                                    onCancel={handleCancel} 
                                    style={{direction:"rtl"}} 
                                    width={800}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>
                                            <span style={{fontFamily:"Negaar-Bold"}}> 
                                                خروج
                                            </span>
                                        </Button>
                                      ]}
                                >
                                    {allUserResume?.map((element) => {
                                        if(element.usertokenref === User.token)
                                            return(
                                                <>
                                                    {element.firstName &&                                             
                                                        <div className="bg-neutral-50 h-auto rounded-md" style={{fontFamily:"koodak"}}>
                                                            <div className="header flex flex-col items-center py-5">
                                                                <h1 className="flex gap-3 text-6xl" style={{fontFamily:"Vanilla"}}>
                                                                    <span className="text-neutral-700">
                                                                        {element.firstName}
                                                                    </span>
                                                                    <span className="text-red-600">
                                                                        {element.lastName}
                                                                    </span>    
                                                                </h1>
                                                                <p className="flex gap-2 py-3 text-base">
                                                                    <span style={{fontFamily:"ComicSans"}}>{element.email}</span>
                                                                    <span>|</span>
                                                                    <span>{element.PhoneNumber}</span>

                                                                </p>
                                                            </div>
                                                            <div className="body">
                                                                <div>
                                                                    <div className="flex w-full">
                                                                        <div className="bg-red-300 text-red-800 w-auto pr-3 pl-5 py-1 text-lg rounded-l-md" style={{fontFamily:"Vanilla"}}>
                                                                            <span>
                                                                                توضیحات
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-5 py-3 text-base">
                                                                        <p>
                                                                            {element.Summary}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex w-full">
                                                                        <div className="bg-red-300 text-red-800 w-auto pr-3 pl-5 py-1 text-lg rounded-l-md" style={{fontFamily:"Vanilla"}}>
                                                                            <span>
                                                                                مهارت ها
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-8 py-3 text-base grid grid-cols-2 gap-3" style={{fontFamily:"ComicSans , Negaar-Regular"}}>
                                                                        {
                                                                            element.skills?.map((skill)=>{
                                                                                return(
                                                                                    <div className="flex">
                                                                                        <span className="pt-[5px]">
                                                                                            <VscCircleFilled/>
                                                                                        </span>
                                                                                        <span>
                                                                                            {skill}
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex w-full py-3">
                                                                        <div className="bg-red-300 text-red-800 w-auto pr-3 pl-5 py-1 text-lg rounded-l-md" style={{fontFamily:"Vanilla"}}>
                                                                            <span>
                                                                                سابقه
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-5 mx-3 my-5 py-3 text-base flex flex-col border-2 border-dashed border-neutral-200 rounded-md">
                                                                        {
                                                                            element.experience?.map((xp)=>{
                                                                                return(
                                                                                    <>
                                                                                        <h1 className="text-lg" style={{fontFamily:"Titr"}}>{xp.title}</h1>
                                                                                        <div className="flex py-5">
                                                                                            <h2 style={{fontFamily:'Negaar-Bold'}}>
                                                                                                {xp.address}
                                                                                            </h2>
                                                                                            <span className="px-3">-</span>
                                                                                            <h2 className="pr-14 font-mono">
                                                                                                {xp.date} 
                                                                                            </h2>
                                                                                        </div>
                                                                                        <p className="py-2 text-sm">
                                                                                            {xp.text}
                                                                                        </p>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex w-full">
                                                                        <div className="bg-red-300 text-red-800 w-auto pr-3 pl-5 py-1 text-lg rounded-l-md" style={{fontFamily:"Vanilla"}}>
                                                                            <span>
                                                                                اطلاعات شخصی
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-5 py-3 text-base">
                                                                        <h5 className="flex gap-3">
                                                                            <span>
                                                                                تاریخ تولد:
                                                                            </span>
                                                                            <span>
                                                                                {element.Birthday}
                                                                            </span>
                                                                        </h5>
                                                                        <h5 className="flex gap-3">
                                                                            <span>
                                                                                تحصیلات :
                                                                            </span>
                                                                            <span>
                                                                                {element.degree} / {element.fieldOfStudy}
                                                                            </span>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex w-full">
                                                                        <div className="bg-red-300 text-red-800 w-auto pr-3 pl-5 py-1 text-lg rounded-l-md" style={{fontFamily:"Vanilla"}}>
                                                                            <span>
                                                                                گواهینامه ها
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="px-8 py-3 text-base grid grid-cols-2 gap-3" style={{fontFamily:"ComicSans , Negaar-Regular"}}>
                                                                        {
                                                                            element.certifications?.map((skill)=>{
                                                                                return(
                                                                                    <div className="flex">
                                                                                        <span className="pt-[5px]">
                                                                                            <VscCircleFilled/>
                                                                                        </span>
                                                                                        <span>
                                                                                            {skill}
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {!element.firstName &&  
                                                        <div className="flex justify-center items-center text-2xl text-red-500 h-96">
                                                            <p>
                                                                کاربر رزومه ای اضافه نکرده است!
                                                            </p>
                                                        </div>
                                                    }
                                                
                                                </>
                                            )                                   
                                    })}
                                </Modal>
                            </ConfigProvider>
                        
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
                                                    onClick={showModal}
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