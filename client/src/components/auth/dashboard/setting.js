import { useState } from "react";
import Developing from "../../Tools/Developing";
import { Avatar, Button, ConfigProvider, Input } from "antd";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from 'axios'
import { useMessageApi } from "../../Tools/MessageProvider";




const Setting = ({userInfo}) => {

    const [phoneNumber , setPhoneNumber] = useState(userInfo.PhoneNumber);
    const [password , setPassword] = useState(userInfo.password);
    const [email , setEmail] = useState(userInfo.email);
    const [userName , setUserName] = useState(userInfo.username);
    const [showPassword , setShowPassword] = useState(false);
    const messageApi = useMessageApi();

    const handleUserNameChange = (e)=>{
        setUserName(e.target.value)
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }
    const handlePhoneNumberChange = (e)=>{
        setPhoneNumber(e.target.value)
    }
    const handleUpdateInformation = ()=>{
        Axios.delete(`http://localhost:3001/deleteUser/${userInfo.token}`)
        Axios.post("http://localhost:3001/addUser" , {
            PhoneNumber : phoneNumber,
            email : email,
            username : userName,
            password : password,
            token : userInfo.token,
            act : userInfo.act,
            imageAddress : userInfo.imageAddress,
            bookmarkId : userInfo.bookmarkId,
            ResumeCover : userInfo.ResumeCover,
            bookmarks : userInfo.bookmarks,
            degree : userInfo.degree,
            file : userInfo.file,
            notes : userInfo.notes,
        }).then(()=>{

            messageApi.open({
                type: 'success',
                content: '!اطلاعات با موفقیت بروزرسانی شد',
                style: {
                    marginTop: '10vh',
                  },
              });
        })
    }
    return (
        <div className="h-[65vh] rounded-b-xl px-8 py-5 flex flex-col border-dashed border-neutral-400 border-2 border-t-0 bg-neutral-200">
            <div dir="rtl" className="w-full flex">
                <div className="w-[50%]">
                    <h1 className="text-4xl text-neutral-700" style={{fontFamily:"Titr"}}>
                        <span> 
                            تنظیمات
                        </span>
                    </h1>
                    <h1 className="text-xl text-neutral-800 pt-5" style={{fontFamily:"Negaar-Bold"}}>
                        <span>
                            آپدیت اطلاعات کاربری
                        </span>
                    </h1>
                    <div className="flex">
                        <div className="w-full flex flex-col gap-5 py-5">
                            <div className="w-full h-auto flex">
                                <h2 className="w-auto px-5 text-xl" style={{fontFamily:"Negaar-Regular"}}>
                                    نام کاربری:
                                </h2>

                                <Input
                                    placeholder="آپدیت نام کاربری"
                                    maxLength={30}
                                    style={{
                                        width : "60%",
                                        fontFamily:"Negaar-Regular"
                                    }} 
                                    onChange={handleUserNameChange}
                                />
                            </div>
                            <div className="w-full h-auto flex">
                                <h2 className="w-auto px-5 text-xl" style={{fontFamily:"Negaar-Regular"}}>
                                    ایمیل کاربری:
                                </h2>

                                <Input
                                    placeholder="آپدیت ایمیل کاربری"
                                    type="email"
                                    maxLength={30}
                                    style={{
                                        width : "60%",
                                        fontFamily:"Negaar-Regular"
                                    }} 
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="w-full h-auto flex">
                                <h2 className="w-auto px-5 text-xl" style={{fontFamily:"Negaar-Regular"}}>
                                    تلفن همراه:
                                </h2>

                                <Input
                                    placeholder="آپدیت تلفن همراه"
                                    style={{
                                        width : "60%",
                                        fontFamily:"Negaar-Regular"
                                    }} 
                                    onChange={handlePhoneNumberChange}
                                    maxLength={15}
                                    minLength={11}
                                />
                            </div>
                            <div className="w-full h-auto flex">
                                <h2 className="w-auto px-5 text-xl" style={{fontFamily:"Negaar-Regular"}}>
                                    رمز عبور:
                                </h2>

                                <ConfigProvider theme={{ token: { fontFamily: 'Negaar-Regular , ComicSans' } }}>
                                    <Input.Password
                                        placeholder="آپدیت رمز عبور"
                                        style={{
                                            width: "60%",
                                            fontFamily: "Negaar-Regular , ComicSans"
                                        }}
                                        onChange={handlePasswordChange}
                                        maxLength={30}
                                        minLength={8}
                                    />
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] h-96 mt-4 px-5 flex justify-center items-center">
                    <div className="bg-neutral-300 w-[60%] h-full rounded-lg overflow-hidden">
                        <div className="h-2/5 bg-cover bg-center" style={{backgroundImage:`url(${userInfo.ResumeCover ? `http://localhost:3001/cover/${userInfo.ResumeCover}` : "/images/Default_background_resume.jpg"})`}}></div>
                        <div className="px-4 py-3 flex flex-col gap-4">
                            <div className="flex">
                                <Avatar size={50} src={userInfo.imageAddress? `http://localhost:3001/images/${userInfo.imageAddress}` : '/images/UserLogo.jpg'} />
                                <div className="h-full w-auto py-3 px-3 text-xl" style={{fontFamily:"ComicSans , Negaar-Bold"}}>
                                    <h1>{userName}</h1>
                                </div>
                            </div>
                            <div className="flex items-center pr-2">
                                <span className="text-xl">
                                    <MdOutlineAttachEmail/>
                                </span>
                                <div className="h-full w-auto px-3 text-sm" style={{fontFamily:"ComicSans , Negaar-Bold"}}>
                                    <h1>{email}</h1>
                                </div>
                            </div>
                            <div className="flex items-center pr-2">
                                <span className="text-lg">
                                    <FaPhoneFlip/>
                                </span>
                                <div className="h-full w-auto px-3 text-sm" style={{fontFamily:"ComicSans , Negaar-Bold"}}>
                                    <h1>{phoneNumber}</h1>
                                </div>
                            </div>
                            <div className="flex items-center pr-2">
                                <span className="text-lg">
                                    <RiLockPasswordLine/>
                                </span>
                                <div className="h-full w-auto px-3 text-sm" style={{fontFamily:"ComicSans , Negaar-Bold"}}>
                                    {/* <h1>{password}</h1> */}
                                    <Button
                                        onClick={()=>{
                                            setShowPassword(!showPassword)
                                        }}
                                    >
                                        {!showPassword && 
                                            <span>
                                                * * * * * * * *
                                            </span>
                                        }
                                        {showPassword &&                                        
                                        <span>
                                            {password}
                                        </span>}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            
            <ConfigProvider theme={{ token: { colorPrimary: '#89C04A' } }}>
                <Button
                    style={{
                        width: "40%",
                        marginRight: "40px",
                        fontSize:"20px"
                    }}
                    type="primary"
                    onClick={handleUpdateInformation}
                >
                    <span style={{fontFamily:"Negaar-Bold"}}>آپدیت اطلاعات</span>
                </Button>
            </ConfigProvider>
        </div>
    );
  }
  
  export default Setting;
