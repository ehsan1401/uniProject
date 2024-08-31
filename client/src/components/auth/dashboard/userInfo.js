import { Button, ConfigProvider, Descriptions, Divider, Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbMoodEdit } from 'react-icons/tb';
import Axios from 'axios'
import { useMessageApi } from "../../Tools/MessageProvider";

const UserInfo = ({ userInfo }) => {
    const [ip, setIp] = useState();
    const navigate = useNavigate();
    const [fileUp , setFile] = useState()
    const token = localStorage.getItem('token')
    const messageApi = useMessageApi();


    const formData = new FormData()
    formData.append('email', userInfo?.email)
    formData.append('username', userInfo?.username)
    formData.append('password', userInfo?.password)
    formData.append('token', userInfo?.token)
    formData.append('act', userInfo?.act)
    formData.append('bookmarkId', userInfo?.bookmarkId)
    formData.append('imageAddress', fileUp)
    if(userInfo.ResumeCover){
      formData.append('ResumeCover', userInfo?.ResumeCover)
    }else{
      formData.append('ResumeCover', '')
    }
    if(userInfo.PhoneNumber){
      formData.append('PhoneNumber', userInfo?.PhoneNumber)
    }else{
      formData.append('PhoneNumber', '')
    }
    if(userInfo.bookmarks){
      formData.append('bookmarks', userInfo?.bookmarks)
    }else{
      formData.append('bookmarks', [])
    }
    if(userInfo.Birthday){
      formData.append('Birthday', userInfo?.Birthday)
    }else{
      formData.append('Birthday', '')
    }
    if(userInfo.degree){
      formData.append('degree', userInfo?.degree)
    }else{
      formData.append('degree', '')
    }

    const handleUpload = (e)=>{
      Axios.delete(`http://localhost:3001/deleteUser/${token}`)
      Axios.post("http://localhost:3001/UploadImageProfile" , formData).then(()=>{

        messageApi.open({
          type: 'success',
          content: 'آواتار با موفقیت بروزرسانی شد',
          style: {
              marginTop: '10vh',
            },
        });
        setFile()
        setTimeout(() => {
          window.location.reload();
      }, 2000);
      })
    //   for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    }

    const getIp = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        setIp("مشکل در شناسایی آی پی");
      }
    };

    const handleLogout = ()=>{
      localStorage.clear();
      navigate('/home');
      window.location.reload();
  }
  
    useEffect(() => {
      getIp();
    }, []);

    const items = [
      {
        key: '1',
        label: 'نام کاربری',
        children: `${userInfo.username}`,
      },
      {
        key: '2',
        label: 'شماره تلفن',
        children: `${userInfo.PhoneNumber ? userInfo.PhoneNumber : "وارد نشده"}`,
      },
      {
        key: '3',
        label: 'ایمیل',
        children: `${userInfo.email}`,
      },
      {
        key: '4',
        label: 'نقش',
        children: `${ userInfo.act !== "Admin" ? `${userInfo.act === "teacher" ? 'معلم' :' دانش آموز'}` : 'ادمین'}`,
      },
      {
        key: '5',
        label: 'مدرک تحصیلی',
        children: `${userInfo.degree ? userInfo.degree : "وارد نشده"}`,
      },
      {
        key: '6',
        label: 'سال تولد',
        children: `${userInfo.Birthday ? userInfo.Birthday : "وارد نشده"}`,
      },
    ];

    return (
      <div className="h-[65vh] rounded-b-xl p-3 flex border-dashed border-neutral-400 border-2 border-t-0 bg-neutral-200">
            <div className="h-full w-1/3 flex flex-col items-center pt-16 pb-5 px-5">
                <div 
                    className="image w-40 h-40 bg-neutral-400 bg-cover rounded-full bg-center duration-200 relative" 
                    style={{
                        backgroundImage : `url(${userInfo.imageAddress ? `http://localhost:3001/images/${userInfo?.imageAddress}` : '/images/UserLogo.jpg'})`
                    }}
                >

                  <form className="absolute bottom-3 right-4 scale-110">
                    <label htmlFor="file-input" className="cursor-pointer">
                      <div className="bg-blue-600 text-lg text-white p-1 rounded-full hover:bg-blue-300 hover:text-neutral-800 duration-200">
                        <TbMoodEdit />
                      </div>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={(e)=>{setFile(e.target.files[0])}}
                    />
                  </form>

                </div>
                {
                  fileUp && 
                  <Button
                    type="primary"
                    style={{marginTop:"6px" , fontFamily:"Negaar-Bold"}}
                    onClick={handleUpload}
                  >
                    <span>
                      آپدیت آواتار
                    </span>
                  </Button>
                }

                <Divider style={{  borderColor: '#7cb305' }}>
                  <h1 className="text-4xl py-2" style={{
                      fontFamily:"ComicSans"
                  }}>{userInfo.username}</h1>
                </Divider>
                <h1 style={{
                      fontFamily:"ComicSans"
                  }}>{userInfo.email}</h1>
                <p style={{fontFamily:"Vanilla"}}>آی پی شما : <span style={{fontFamily:"ComicSans , Negaar-Regular"}}>{ip}</span></p>
                <Button
                  danger
                  type="primary"
                  style={{marginTop:"6px" , fontFamily:"Negaar-Bold"}}
                  onClick={handleLogout}
                >
                  <span>
                    خروج از حساب کاربری
                  </span>
                </Button>
            </div>

            <div className="h-full p-8 w-2/3" dir="rtl">
            <ConfigProvider
              theme={{
                components: {
                  Descriptions: {
                    fontSize : 18
                  },
                },
              }}
            >
              <Descriptions title={<span style={{fontFamily:"Titr" ,fontSize:"20px"}}>مشخصات کاربر</span>} items={items} layout="vertical" style={{
                fontFamily:"Negaar-Regular , ComicSans",
              }} />
            </ConfigProvider>
            </div>

        </div>
    );
  }

  export default UserInfo;










