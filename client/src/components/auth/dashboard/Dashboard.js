import { useEffect, useState } from "react";
import Navigation from "../../Tools/NavBar";
import Axios from 'axios';
import { Button, ConfigProvider, Flex, Image, Spin, Tabs} from 'antd';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import UserInfoComponent from "./userInfo";
import Bookmark from "./bookmark";
import { FaIdCardAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import Resume from "./resume";
import Setting from "./setting";
import { IoDocumentText , IoSettingsOutline } from "react-icons/io5";
import Access from "../../Tools/acess";






const Dashboard = () => {

    const [loading, setLoading] = useState(true);
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
        });
        setLoading(false)
        })
    },[])




    const items = [
        {
          key: '1',
          label: <div className="flex"><span className="text-xl" style={{fontFamily: "Negaar-Regular"}}>اطلاعات کاربر</span><span className="text-lg pt-1 px-2"><FaIdCardAlt /></span></div>,
          children: <UserInfoComponent userInfo={UserInfo} />,
        },
        {
            key: '2',
            label: <div className="flex"><span className="text-xl" style={{fontFamily: "Negaar-Regular"}}>بروزرسانی روزمه</span><span className="text-lg pt-1 px-2"><IoDocumentText /></span></div>,
            children: UserInfo.act !== 'student' ? <Resume userInfo={UserInfo}/> : <Access message={`دانش آموز نمی تواند رزومه اضافه کند!`}/>,
        },
        {
            key: '3',
            label: <div className="flex"><span className="text-xl" style={{fontFamily: "Negaar-Regular"}}>ذخیره شده ها</span><span className="text-lg pt-1 px-2"><FaRegBookmark /></span></div>,
            children: <Bookmark />,
        },        
        {
            key: '4',
            label: <div className="flex"><span className="text-xl" style={{fontFamily: "Negaar-Regular"}}>تنظیمات</span><span className="text-lg pt-1 px-2"><IoSettingsOutline /></span></div>,
            children: <Setting />,
        },

      ];
    return (
        <>      
            <Spin spinning={loading} fullscreen size="large" />
                <Navigation/>
                <div className="p-10" dir="rtl">
                    <div className="rounded-lg">
                        <Tabs defaultActiveKey="1" items={items} type="card" style={{
                            height : "100%",
                        }} />
                    </div>
                </div>
        </>
        
    );
  }

  export default Dashboard;