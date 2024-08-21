import { Button, ConfigProvider, Descriptions, Divider, Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ userInfo }) => {
    const [ip, setIp] = useState();
    const navigate = useNavigate();
  
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
            <div className="h-full w-1/3 flex flex-col items-center py-16 px-5">
                <div 
                    className="image w-40 h-40 bg-neutral-400 bg-cover rounded-full bg-center hover:scale-110 duration-200" 
                    style={{
                        backgroundImage : `url(${userInfo.imageAddress ? userInfo.imageAddress : '/images/UserLogo.png'})`
                    }}
                ></div>
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










