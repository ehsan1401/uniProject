import { Button, Select, Flex, Input, Tag, ConfigProvider } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TextArea from 'antd/es/input/TextArea';
import { useMessageApi } from '../../Tools/MessageProvider';




const Resume = ({ userInfo }) => {
    const messageApi = useMessageApi();

    const [showCalendar , setShowCalendar] = useState(false)
    const [firstName , setFirstname] = useState()
    const [lastName , setLastname] = useState()
    const [degree , setDegree] = useState(userInfo.degree)
    const [email , setEmail] = useState(userInfo.email)
    const [phoneNumber , setPhoneNumber] = useState(userInfo.PhoneNumber)
    const [birthday , setBirthday] = useState()
    const [skills , setSkills] = useState([])
    const [skillonChange , setSkillonChange] = useState()
    const [summary , setSummary] = useState()
    const [experience , setExperience] = useState([])
    const [certifications , setCertifications] = useState([])
    const [certificationChange , setCertificationChange] = useState()
    const [fieldOfStudy , setFieldOfStudy] = useState()

    var tags = []
    const [Users , setUsers] = useState([{}])

    const handleBirthdayEntry = (birthday)=>{
        setBirthday(birthday.format("YYYY/MM/DD"))
        setShowCalendar(false)
    }
    const addToSkills = ()=>{
        skillonChange ? setSkills(prevStrings => [...prevStrings, skillonChange]) : console.log();
        setSkillonChange()
    }

    const addTocertifications = ()=>{
        certificationChange ? setCertifications(prevStrings => [...prevStrings, certificationChange]) : console.log();
        setCertificationChange()
    }

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        address: '',
        text: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleExperienceSubmit = (e) => {
        e.preventDefault();
        const newExperience = {
        title: formData.title,
        date: formData.date,
        address: formData.address,
        text: formData.text,
        };
        setExperience((prevExperiences) => [...prevExperiences, newExperience]);
    };
    useEffect(()=>{
        axios.get("http://localhost:3001/getUsers").then((response)=>{
            setUsers(response.data)
        })
    },[])

    const handleAddResume = ()=>{
        if(firstName && lastName && email && phoneNumber){
            tags.push(degree)
            tags.push(firstName)
            tags.push(lastName)
            tags.push(phoneNumber)
            tags.push(email)
            tags.push(skills)
            tags.push(summary)
            tags.push(experience)
            tags.push(certifications)
            tags.push(fieldOfStudy)
            axios.post(`http://localhost:3001/deleteResume/${userInfo.token}`)
            axios.post("http://localhost:3001/addResume" , {
                usertokenref: userInfo.token,
                degree: degree,
                firstName: firstName,
                lastName: lastName,
                PhoneNumber: phoneNumber,
                email: email,
                Birthday: birthday,
                skills: skills,
                Summary: summary,
                experience: experience,
                certifications: certifications,
                fieldOfStudy: fieldOfStudy,
                tags : tags
            }).then(()=>{
                Users.forEach((user) => {
                    if (userInfo.token === user.token) {
                        axios.delete(`http://localhost:3001/deleteUser/${userInfo.token}`)
                        axios.post("http://localhost:3001/addUser", {
                            username : userInfo.username,
                            email : userInfo.email,
                            token : userInfo.token,
                            password : userInfo.password,
                            act : userInfo.act,
                            bookmarkId : userInfo.bookmarkId,
                            PhoneNumber : phoneNumber,
                            Birthday : birthday,
                            degree : degree
                        })
                    }
                });
            })

            
            messageApi.open({
                type: 'success',
                content: 'روزمه با موفقیت آپدیت شد',
                duration: 5,
                style: {
                    marginTop: '10vh',
                },
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'فیلد های مورد نظر نمی توانند خالی باشند',
                duration: 5,
                style: {
                    marginTop: '10vh',
                },
            })
        }
    }

    return (
            <div className='px-32'> 
                <div className='bg-neutral-900 text-neutral-100 bg-opacity-50 rounded-lg pb-24 pt-10 px-24 text-xl' style={{fontFamily:"Negaar-Regular"}}>
                    <h1 className='text-white text-3xl py-5' style={{fontFamily:"Titr"}}>آپدیت روزمه</h1>
                    <ConfigProvider
                        theme={{
                            token: {
                                fontFamily : "Negaar-Regular , ComicSans"
                            },
                        }}
                    >
                    <Form>
                        <Flex
                            gap={15}
                            vertical
                        >
                            <div className='flex gap-5 w-full'>
                                <div className='w-1/2'>
                                    <label htmlFor="firstName">نام</label>
                                    <Input 
                                        type="text"
                                        name='firstName'
                                        placeholder='نام'
                                        onChange={(e)=>{setFirstname(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="firstName">نام خانوادگی</label>
                                    <Input 
                                        type="text"
                                        name='lastName'
                                        placeholder='نام خانوادگی'
                                        onChange={(e)=>{setLastname(e.target.value)}}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-5'>
                                <div className='w-1/2'>
                                    <label htmlFor="phoneNumber">شماره تلفن</label>
                                    <Input 
                                        type="text"
                                        defaultValue={userInfo.PhoneNumber}
                                        name='phoneNumber'
                                        placeholder='شماره تلفن'
                                        onChange={(e)=>{setPhoneNumber(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="email">ایمیل کاربری</label>
                                    <Input 
                                        type="email"
                                        defaultValue={userInfo.email}
                                        name='email'
                                        placeholder='ایمیل'
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-3 w-full'>
                                <div className='w-1/3 flex items-center gap-3 pt-6'>
                                    <label htmlFor="degree">مدرک تحصیلی</label>
                                    {/* <Input 
                                        type="text"
                                        defaultValue={userInfo.degree}
                                        name='degree'
                                        placeholder='مدرک تحصیلی'
                                        onSubmit={(e)=>{setDegree(e.target.value)}}
                                    /> */}
                                    <Select
                                        defaultValue={userInfo.degree}
                                        onChange={(e)=>{setDegree(e)}}
                                        style={{width:"150px"}}
                                        showSearch
                                        placeholder="آخرین مدرک تحصیلی"
                                        optionFilterProp="label"
                                        options={[                                       
                                        {
                                            value: 'کاردانی پیوسته',
                                            label: 'کاردانی پیوسته',
                                        },                                        
                                        {
                                            value: 'کاردانی ناپیوسته',
                                            label: 'کاردانی ناپیوسته',
                                        },                                                                               
                                        {
                                            value: 'کارشناسی پیوسته',
                                            label: 'کارشناسی پیوسته',
                                        },                                        
                                        {
                                            value: 'کارشناسی ناپیوسته',
                                            label: 'کارشناسی ناپیوسته',
                                        },                                                                               
                                        {
                                            value: 'کارشناسی ارشد پیوسته',
                                            label: 'کارشناسی ارشد پیوسته',
                                        },                                        
                                        {
                                            value: 'کارشناسی ارشد ناپیوسته',
                                            label: 'کارشناسی ارشد ناپیوسته',
                                        },                                        
                                        {
                                            value: 'دکتری',
                                            label: 'دکتری',
                                        },                                        
                                        {
                                            value: 'دکترای حرفه ای',
                                            label: 'دکترای حرفه ای',
                                        },                                        
                                        {
                                            value: 'دکترای تخصصی',
                                            label: 'دکترای تخصصی',
                                        },                                        
                                        {
                                            value: 'ترجیح میدم نگم',
                                            label: '',
                                        }
                                        ]}
                                    />
                                </div>
                                
                                <div className='w-1/3 relative flex items-center justify-center gap-3 pt-6'>
                                    <label htmlFor="birthday" className=''>تاریخ تولد</label>
                                    {/* <Input 
                                        type="text"
                                        name='birthday'
                                        placeholder='روز'
                                        onSubmit={(e)=>{setBirthday(e.target.value)}}
                                    /> */}
                                    <Button onClick={()=>{
                                        setShowCalendar(!showCalendar)
                                    }}>
                                        <span style={{fontFamily:"Negaar-Bold"}}>انتخاب تاریخ</span>

                                    </Button>
                                    {showCalendar &&                                     
                                        <div className='absolute z-50'>
                                            <Calendar
                                                calendar={persian}
                                                locale={persian_fa}
                                                value={birthday}
                                                format="MM/DD/YYYY HH:mm:ss"
                                                onChange={handleBirthdayEntry}
                                            />
                                        </div>
                                    }
                                    <p>{birthday}</p>
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="fieldOfStudy">رشته تحصیلی</label>
                                    <Input 
                                        type="text"
                                        name='fieldOfStudy'
                                        placeholder='رشته تحصیلی'
                                        onChange={(e)=>{setFieldOfStudy(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-3 pt-6'>
                                <label htmlFor="skills">مهارت ها</label>
                                <Input 
                                    style={{width:"80%"}}
                                    type="text"
                                    name='skills'
                                    placeholder='مهارت ها'
                                    // onSubmit={(e)=>{setSkills(...e.target.value)}}
                                    onChange={(e)=>{setSkillonChange(e.target.value)}}
                                    onPressEnter={addToSkills}
                                />
                                <Button 
                                    onClick={addToSkills}
                                    type='primary'
                                >
                                    <span 
                                        style={{
                                            fontFamily:"Negaar-Bold"
                                        }}
                                        className='text-lg'
                                    >
                                        افزودن  
                                    </span>
                                </Button>
                            </div>
                            <div className='flex gap-3 flex-wrap pr-20'>
                                {skills.map((item)=>{
                                    return(
                                        <Tag
                                            color='cyan'
                                        >
                                            <span className='text-base' style={{fontFamily:"Negaar-Bold , ComicSans"}}>
                                                {item}
                                            </span>
                                        </Tag>
                                    )
                                })}
                            </div>
                            <div>
                                <label htmlFor="experience">سوابق</label>
                                <form className=''>
                                    <div className='flex gap-3 py-3'>
                                        <Input 
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder='عنوان'
                                        />
                                        <Input 
                                            type="text"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            placeholder='تاریخ'

                                        />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <Input 
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder='محل'

                                        />
                                        <TextArea
                                            name='text'
                                            placeholder='توضیحات'
                                            showCount
                                            maxLength={1000}
                                            style={{ height: 120, resize: 'none' }}
                                            value={formData.text}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Button
                                    type='primary'
                                        onClick={handleExperienceSubmit}
                                        block
                                        style={{
                                            marginTop:"15px"
                                        }}
                                    >
                                        <span                                         
                                            style={{
                                                fontFamily:"Negaar-Bold"
                                            }}
                                            className='text-lg'>
                                            افزودن 
                                        </span>
                                    </Button>
                                </form>
                                <div className='flex gap-3 flex-col py-2'>
                                    {experience.map((item)=>{
                                        return(
                                            <div className='border-dashed border-neutral-300 border-2 w-full bg-neutral-100 text-neutral-600 rounded-md py-2 px-4' >
                                                <div className='flex gap-3'>
                                                    <h1 className='' style={{fontFamily:"Titr"}}>{item.title}</h1>
                                                    <p>-</p>
                                                    <h1 className='text-sm pt-1' style={{fontFamily:"ComicSans"}}>{item.date}</h1>
                                                </div>
                                                <h1 className='text-base pt-2' style={{fontFamily:"Negaar-Regular"}}>{item.address}</h1>
                                                <h1 className='pt-3 p-3 text-base' style={{fontFamily:"koodak"}}>{item.text}</h1>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex gap-3 py-5'>
                                <label htmlFor="certifications">گواهی نامه ها</label>
                                <Input 
                                    style={{width:"76%"}}
                                    type="text"
                                    name='certifications'
                                    placeholder='گواهی نامه ها'
                                    onChange={(e)=>{setCertificationChange(e.target.value)}}
                                    onPressEnter={addTocertifications}
                                />
                                <Button
                                    onClick={addTocertifications}
                                    type='primary'
                                >
                                    <span
                                        style={{
                                            fontFamily:"Negaar-Bold"
                                        }}
                                        className='text-lg'
                                    >
                                        افزودن
                                    </span>
                                </Button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {certifications.map((certifi)=>{
                                    return(
                                        <Tag
                                            color='geekblue'
                                        >
                                            <span className='text-base' style={{fontFamily:"Negaar-Bold , ComicSans"}}>
                                                {certifi}
                                            </span>
                                        </Tag>
                                    )
                                })}
                            </div>
                            <div>
                                <label htmlFor="summary">توضیحات</label>
                                <TextArea
                                    name='summary'
                                    placeholder='توضیحات'
                                    showCount
                                    maxLength={500}
                                    onChange={(e)=>{setSummary(e.target.value)}}
                                    style={{ height: 120, resize: 'none' }}
                                />
                            </div>
                            <div>
                                <Button
                                    type='primary'
                                    onClick={handleAddResume}
                                    block
                                >
                                    <span className='text-lg' style={{fontFamily:"Negaar-Regular"}}>آپدیت رزومه</span>
                                </Button>
                            </div>

                        </Flex>
                    </Form>
                    </ConfigProvider>
                </div>
            </div>
    );
  }

  export default Resume;
