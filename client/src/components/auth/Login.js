
import Navigation from "../Tools/NavBar";
import { FaUser , FaUnlock } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { Button, ConfigProvider, Flex, Input , Tooltip } from 'antd';
import{useState , useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useMessageApi } from '../Tools/MessageProvider';




const Login = () => {
    const navigate = useNavigate();
    const messageApi = useMessageApi();

    const token = localStorage.getItem('token');
    const [Users , setUsers] = useState([{}])
    const [userLogin , setUserLogin] = useState();

    
    const [status , setStatus] = useState('');
    const [passwordStatus , setPasswordStatus] = useState('');

    const [passwordValue , setPasswordValue] = useState();
    const [usernameValue , setUsernameValue] = useState();


    const [errorMessage , setErrorMessage] = useState('');
    const [passwordErrorMessage , setPasswordErrorMessage] = useState('');

    const [usersuffixIcon , setusersuffixIcon] = useState();
    const [passwordsuffixIcon , setPasswordsuffixIcon] = useState();





    useEffect(()=>{
        if(token){
            navigate('/home');
        }
        Axios.get("http://localhost:3001/getUsers").then((response)=>{
            setUsers(response.data)
        })
    },[])

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const handleUsername = (e)=>{
        setUsernameValue(e.target.value);
        if(emailRegex.test(e.target.value)){
            setusersuffixIcon(
                <Tooltip title="بسیار عالی">
                    <GrStatusGood style={{ color: '#49d823' }} />
                </Tooltip>
             ) ;
        }else{
            setusersuffixIcon(
                <Tooltip title="ایمیل معتبر نیست!">
                    <RiErrorWarningLine style={{ color: '#ffa025' }} />
                </Tooltip>
            );
        }

    }

    const handlePassword = (e)=>{
        setPasswordValue(e.target.value);

        e.target.value.length < 8 ? setPasswordStatus("warning") : setPasswordStatus("") ;
        e.target.value.length < 8 ? 
        setPasswordsuffixIcon(
            <Tooltip title="خطایی وجود دارد">
                <RiErrorWarningLine style={{ color: '#ffa025' }} />
            </Tooltip>
        )
         : 
         setPasswordsuffixIcon(
            <Tooltip title="بسیار عالی">
                <GrStatusGood style={{ color: '#49d823' }} />
            </Tooltip>
         ) ;

        e.target.value.length < 8 ? setPasswordErrorMessage("طول پسورد باید بیشتر از 8 باشد!") : setPasswordErrorMessage("") ;
    }



    const handleSubmit = () => {
        let userFound = false;
        let passwordCorrect = false;

    
        if(!usernameValue && !passwordValue){
            setPasswordErrorMessage("پسورد را وارد کنید!");
            setErrorMessage("ایمیل کاربری را وارد کنید!");
        }else{
            Users.forEach((user) => {
                if (user.email === usernameValue) {
                    if(user.password === passwordValue){
                        localStorage.setItem("token", user.token);
                        setUserLogin(user.token);
                        passwordCorrect = true;

                    }
                    userFound = true;
                }
            });
        
            if (userFound) {
                setErrorMessage("");
                if (passwordCorrect) {
                    messageApi.open({
                        type: 'success',
                        content: 'با موفقیت وارد شدید',
                        style: {
                            marginTop: '10vh',
                          },
                      });
                    setErrorMessage("");
                    navigate('/Dashboard');

                } else {
                    passwordValue ? setPasswordErrorMessage("پسورد اشتباه است!") : setPasswordErrorMessage("!پسورد را وارد کنید");
                }
            } else {
                setUserLogin({});
                setErrorMessage("ایمیل کاربری موجود نمی باشد!");
            }
        }


    };
    return (
        <>
            <Navigation/>
            <div className="Login h-full w-full" dir="rtl">
                <form action="" className="w-full h-full flex justify-center items-center">

                    <div className="bg-gray-800 lg:w-1/3 md:w-[45%] w-[60%] h-auto rounded-md px-5 py-7 ">
                        <h1 className="text-2xl p-3 text-center text-neutral-100" style={{fontFamily : "Negaar-Regular"}}>ورود به رزومه ساز</h1>
                        <p className="w-full px-5 bg-neutral-100 h-1 flex justify-center"></p>
                        <div className="h-auto w-full mt-10 px-3">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        fontFamily: 'koodak, ComicSans',
                                    },
                                }}
                            >
                                <Flex gap="small" vertical>
                                    <Input
                                        placeholder="ایمیل خود را وارد کنید..." 
                                        size="large" 
                                        type="email" 
                                        status={status} 
                                        onChange={handleUsername} 
                                        prefix={<FaUser />} 
                                        suffix={usersuffixIcon}
                                    />
                                    <Input 
                                        placeholder="پسورد خود را وارد کنید..." 
                                        size="large" 
                                        type="password" 
                                        status={passwordStatus}
                                        prefix={<FaUnlock />}
                                        onChange={handlePassword}
                                        suffix={passwordsuffixIcon}
                                    />
                                    <Button type="primary" block onClick={handleSubmit}>
                                        <span className="text-lg" style={{fontFamily : 'Negaar-Bold'}}>ورود</span>
                                    </Button>
                                </Flex>
                            </ConfigProvider>
                        </div>
                        <p className="pr-5 py-2 text-neutral-200" style={{fontFamily:"koodak"}}>
                            حساب کاربری ندارید؟ 
                        <Link to="/Register">
                            <span className="text-lg px-1 text-blue-600 hover:text-blue-400 transition duration-150" style={{fontFamily: "Negaar-Bold"}}>
                                ثبت نام کنید
                            </span>
                            </Link>
                        </p>
                        <div className="text-orange-400 pr-5 pt-2" style={{fontFamily: "koodak"}}>
                            <p>{errorMessage}</p>
                            <p>{passwordErrorMessage}</p>
                        </div>
                        
                    </div>
                </form>

            </div>
        </>
        
    );
  }

  export default Login;
