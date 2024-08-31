import Navigation from "../Tools/NavBar";
import { MdEmail , MdLockPerson } from "react-icons/md";
import { FaUser } from "react-icons/fa";

//error dare

import { Button, ConfigProvider, Flex, Input , Radio, Space, Tooltip} from 'antd';
import{useState , useEffect} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiErrorWarningLine } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useMessageApi } from "../Tools/MessageProvider";

const Register = () => {
    
    const navigate = useNavigate();
    const messageApi = useMessageApi();

    const [user , setUser] = useState();
    const [token , setToken] = useState();
    const [bookmarkId , setBookmarkId] = useState();




    const [username , setUsername] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [repassword , setRepassword] = useState();

    const [usernameError , setUsernameError] = useState();
    const [emailError , setEmailError] = useState();
    const [passwordError , setPasswordError] = useState();
    const [repasswordError , setRepasswordError] = useState();

    const [userNameStatus , setUserNameStatus] = useState();
    const [emailStatus , setEmailStatus] = useState();
    const [passwordStatus , setPasswordStatus] = useState();
    const [repasswordStatus , setRepasswordStatus] = useState();

    const [passwordSuffixError , setPasswordSuffixError] = useState();
    const [repasswordSuffixError , setRepasswordSuffixError] = useState();
    const [act, setAct] = useState('student');
    const tags = [] ;



    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;


    const StudendCheckerHandler = (e) => {
        console.log('radio checked', e.target.value);
        setAct(e.target.value);
      };


    const handleUsername = (e)=>{
        setUsername(e.target.value);
        e.target.value.length > 20 ? setUserNameStatus("warning") : setUserNameStatus("") ;
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
        e.target.value.length < 4 ? setEmailStatus("warning") : setEmailStatus("") ;
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
        e.target.value.length < 8 ? setPasswordStatus("warning") : setPasswordStatus("") ;
        e.target.value.length < 8 ? 
        setPasswordSuffixError(
            <Tooltip title="گذرواژه باید بیشتر از 8 کاراکتر باشد">
                <RiErrorWarningLine style={{ color: '#ffa025' }} />
            </Tooltip>
        )
         : 
         setPasswordSuffixError(
            <Tooltip title="طول کاراکتر رعایت شده">
                <GrStatusGood style={{ color: '#49d823' }} />
            </Tooltip>
         ) ;
    }
    const handleRepassword = (e)=>{
        setRepassword(e.target.value);
        e.target.value.length < 8 ? setRepasswordStatus("warning") : setRepasswordStatus("") ;
        e.target.value.length < 8 ? 
        setRepasswordSuffixError(
            <Tooltip title="پسورد باید بیشتر از 8 کاراکتر باشد">
                <RiErrorWarningLine style={{ color: '#ffa025' }} />
            </Tooltip>
        )
         : 
         setRepasswordSuffixError(
            <Tooltip title="طول کاراکتر رعایت شده">
                <GrStatusGood style={{ color: '#49d823' }} />
            </Tooltip>
         ) ;
    }

    useEffect(() => {
        setToken(crypto.randomUUID())
        const truncatedUuid = crypto.randomUUID().slice(0, 5);
        setBookmarkId(truncatedUuid)
    }, []);

    if(email){            
        Axios.get(`http://localhost:3001/GetEmails`).then((response)=>{
            setUser(response.data)
        })
    }
            

    const handleSubmit = async ()=>{

        if(username){
            setUsernameError("")
            if(email){
                if(emailRegex.test(email)){
                    if(!user.includes(email)){
                        setEmailError("")
                        if(password){
                            if(repassword){
                                setRepasswordError("")
                                if(password === repassword){
                                    if(passwordStatus === "warning" || repasswordStatus === "warning"){
                                        setPasswordError("طول کاراکتر گذرواژه رعایت نشده است!")
                                    }else{
                                        tags.push(username)
                                        tags.push(email)
                                        tags.push(act)
                                        Axios.post("http://localhost:3001/addUser" , {
                                            username,
                                            email,
                                            password,
                                            token,
                                            act,
                                            bookmarkId
                                        }).then(()=>{
                                            Axios.post("http://localhost:3001/addResume" , {
                                                usertokenref: token,
                                                tags
                                            })
                                            localStorage.setItem('token',token);
                                            messageApi.open({
                                                type: 'success',
                                                content: 'با موفقیت ثبت نام شدید',
                                                style: {
                                                    marginTop: '10vh',
                                                  },
                                              });
                                            navigate('/home');
                                        })
                                    }
                                }else{
                                    setRepasswordError("گذرواژه با تکرار آن برابر نیست!")
                                }
                            }else{
                                setRepasswordError("لطفا گذرواژه خود را تکرار کنید!")
                            }
                        }else{
                            setPasswordError("گذرواژه ورود خود را انتخاب کنید!")
                        }
                    }else{
                        setEmailError("ایمیل کاربری قبلا ثبت نام شده است!")
                    }
                }else{
                    setEmailError("ایمیل کاربری نا معتبر است!")
                }
            }else{
                setEmailError("ایمیل کاربری نمی تواند خالی باشد!")
            }
        }else{
            setUsernameError("نام کاربری نمی تواند خالی باشد!")
        }
    }

    return (
        <>
            <Navigation/>
            <div className="Register h-full w-full" dir="rtl">
                <form className="w-full h-full flex justify-center items-center" action={handleSubmit}>
                    <div className="bg-gray-800 lg:w-1/3 md:w-[45%] w-[70%] h-auto rounded-md px-[3%] py-7">
                        <h1 className="text-2xl p-3 text-center text-neutral-100" style={{fontFamily : "Negaar-Regular"}}>ثبت نام در رزومه ساز</h1>
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
                                        placeholder="نام کاربری خود را وارد کنید..." 
                                        size="large" 
                                        type="text" 
                                        name="username"
                                        status={userNameStatus} 
                                        onChange={handleUsername} 
                                        prefix={<FaUser />} 
                                        // suffix={usersuffixIcon}
                                    />
                                    <Input
                                        placeholder="ایمیل خود را وارد کنید..." 
                                        size="large" 
                                        type="email" 
                                        name="email"
                                        status={emailStatus} 
                                        onChange={handleEmail} 
                                        prefix={<MdEmail />} 
                                        // suffix={usersuffixIcon}
                                    />
                                    <Input 
                                        placeholder="گذرواژه خود را وارد کنید..." 
                                        size="large" 
                                        type="password" 
                                        name="password"
                                        status={passwordStatus}
                                        prefix={<MdLockPerson />}
                                        onChange={handlePassword}
                                        suffix={passwordSuffixError}
                                    />
                                    <Input 
                                        placeholder="گذرواژه خود را مجددا وارد کنید..." 
                                        size="large" 
                                        type="password" 
                                        status={repasswordStatus}
                                        prefix={<MdLockPerson />}
                                        onChange={handleRepassword}
                                        suffix={repasswordSuffixError}
                                    />
                                    <Radio.Group onChange={StudendCheckerHandler} value={act}>
                                            <Radio value='student' ><span style={{fontFamily:"Negaar-Regular"}} className="text-base text-neutral-300"> دانش آموز هستم</span></Radio>
                                            <Radio value='teacher' ><span style={{fontFamily:"Negaar-Regular"}} className="text-base text-neutral-300"> استاد هستم</span></Radio>
                                    </Radio.Group>
                                    <Button
                                        type="primary"
                                        block
                                        onClick={handleSubmit}
                                    >
                                        <span className="text-lg" style={{fontFamily : 'Negaar-Bold'}}>ثبت نام</span>
                                    </Button>
                                </Flex>
                            </ConfigProvider>
                        </div>
                        <p className="pr-5 py-2 text-neutral-200" style={{fontFamily:"koodak"}}>حساب کاربری دارید؟ <Link to="/Login"><span className="text-lg text-blue-600 hover:text-blue-400 transition duration-150" style={{fontFamily: "Negaar-Bold"}}>وارد شوید</span></Link></p>
                        <div className="text-orange-400 pr-5 pt-2" style={{fontFamily: "koodak"}}>
                            <p>{usernameError}</p>
                            <p>{passwordError}</p>
                            <p>{repasswordError}</p>
                            <p>{emailError}</p>
                        </div>
                        
                    </div>
                    </form>
            </div>
        </>
        
    );
  }

  export default Register;










        

