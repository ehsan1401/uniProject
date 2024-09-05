import { useEffect, useState } from "react";
import Developing from "../../Tools/Developing";
import { Avatar, Button, ConfigProvider, Input } from "antd";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import Axios from 'axios'
import { useMessageApi } from "../../Tools/MessageProvider";
import { MdFileUpload } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import { TbRuler } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";




const ResumeSetting = ({userInfo}) => {
    const messageApi = useMessageApi();
    const [fileUp , setFile] = useState(null)
    const [cover , setCover] = useState(null)

    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setFile(null);
        } else {
            setError('');
            setFile(selectedFile);
        }
    };

    const handleCoverChange = (e) => {
        const selectedFile = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
    
        if (selectedFile && !validTypes.includes(selectedFile.type)) {
            setError('Please upload a JPG or PNG image file.');
            setCover(null);
        } else {
            setError('');
            setCover(selectedFile);
        }
    };
    const formData = new FormData()
    formData.append('email', userInfo?.email)
    formData.append('username', userInfo?.username)
    formData.append('password', userInfo?.password)
    formData.append('token', userInfo?.token)
    formData.append('act', userInfo?.act)
    formData.append('imageAddress', userInfo.imageAddress ? userInfo?.imageAddress : "/images/UserLogo.jpg" )
    formData.append('ResumeCover', userInfo.ResumeCover ? userInfo?.ResumeCover : null)
    formData.append('PhoneNumber', userInfo.PhoneNumber ? userInfo?.PhoneNumber : null)
    formData.append('bookmarkId', userInfo?.bookmarkId)
    formData.append('bookmarks', userInfo.bookmarks ? userInfo?.bookmarks : [])
    formData.append('Birthday', userInfo.Birthday ? userInfo?.Birthday : null)
    formData.append('degree', userInfo.degree ? userInfo?.degree : null)
    formData.append('file', fileUp)


    const formDataCover = new FormData()
    formDataCover.append('email', userInfo?.email)
    formDataCover.append('username', userInfo?.username)
    formDataCover.append('password', userInfo?.password)
    formDataCover.append('token', userInfo?.token)
    formDataCover.append('act', userInfo?.act)
    formDataCover.append('imageAddress', userInfo.imageAddress ? userInfo?.imageAddress : "/images/UserLogo.jpg" )
    formDataCover.append('ResumeCover', cover)
    formDataCover.append('PhoneNumber', userInfo.PhoneNumber ? userInfo?.PhoneNumber : null)
    formDataCover.append('bookmarkId', userInfo?.bookmarkId)
    formDataCover.append('bookmarks', userInfo.bookmarks ? userInfo?.bookmarks : [])
    formDataCover.append('Birthday', userInfo.Birthday ? userInfo?.Birthday : null)
    formDataCover.append('degree', userInfo.degree ? userInfo?.degree : null)
    formDataCover.append('file', userInfo.file ? userInfo.file : null)
    
    const handleUpload = (e)=>{
        Axios.delete(`http://localhost:3001/deleteUser/${userInfo.token}`)
        Axios.post("http://localhost:3001/UploadFile" , formData)        
        .then(response => {
            messageApi.open({
                type: 'success',
                content: '!فایل ضمیمه با موفقیت آپلود شد',
                style: {
                    marginTop: '10vh',
                  },
              });
              setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
    }
    const handleUploadCover = (e)=>{
        Axios.delete(`http://localhost:3001/deleteUser/${userInfo.token}`)
        Axios.post("http://localhost:3001/UploadCover" , formDataCover)
        .then(response => {
            messageApi.open({
                type: 'success',
                content: '!کاور با موفقیت آپلود شد',
                style: {
                    marginTop: '10vh',
                  },
              });
              setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
    }

    return (
        <div className="h-[65vh] rounded-b-xl px-8 py-5 flex flex-col border-dashed relative border-neutral-400 border-2 border-t-0 bg-neutral-200">
            <div className="">
                <h1 className="text-4xl text-neutral-700" style={{fontFamily:"Titr"}}>
                    <span>
                        تنظیمات رزومه
                    </span>
                </h1>
                <h1 className="text-xl text-neutral-800 pt-5" style={{fontFamily:"Negaar-Bold"}}>
                    <span>
                        آپدیت اطلاعات صفحه کاربر
                    </span>
                </h1>
            </div>
            <div className="w-full flex h-full">
                <div className=" w-[50%] relative">
                    <div className="flex flex-col">
                        <h1 className="pt-4 pb-2 px-3 text-lg" style={{fontFamily:"Extender"}}>
                            <span>
                                آپلود فایل ضمیمه
                            </span>
                        </h1>
                        {/* <input type="file" accept=".pdf" onChange={handleFileChange}/>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!error && 
                            <Button 
                                onClick={handleUpload}
                                type="primary"
                                style={{
                                    width:"200px"
                                }}
                            >
                                آپلود
                            </Button>
                        } */}
                        <label class="flex gap-3 w-28">
                            <input type="file" accept=".pdf" onChange={handleFileChange} class="hidden" id="fileInput"/>
                            <Button
                                type="primary"
                            >
                                <label for="fileInput" class="cursor-pointer w-full text-sm text-neutral-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 flex"
                                    style={{
                                        fontFamily:"Negaar-Regular"
                                    }}
                                >
                                    <span
                                        className="px-2"
                                    >
                                        انتخاب فایل
                                    </span>
                                    <span className="mt-[2px]">
                                        <FaFileImport />
                                    </span>
                                </label>
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleUpload}
                                disabled={fileUp? false : true}
                            >
                                <span
                                    style={{
                                        fontFamily:"Negaar-Regular"
                                    }}
                                    className="pr-2"
                                >
                                    آپلود فایل
                                </span>
                                <span className="">
                                    <MdFileUpload />
                                </span>
                            </Button>
                        </label>

                        <h1 className="pr-2 pt-3">
                            {fileUp?.name}
                        </h1>
                    </div>
                        <div className="flex flex-col">
                            <h1 className="pt-4 pb-2 px-3 text-lg" style={{fontFamily:"Extender"}}>
                                <span>
                                    آپلود کاور رزومه
                                </span>
                            </h1>
                            <label class="flex gap-3 w-28">
                                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleCoverChange} class="hidden" id="coverInput"/>
                                <Button
                                    type="primary"
                                >
                                    <label for="coverInput" class="cursor-pointer w-full text-sm text-neutral-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 flex"
                                        style={{
                                            fontFamily:"Negaar-Regular"
                                        }}
                                    >
                                        <span
                                            className="px-2"
                                        >
                                            انتخاب عکس
                                        </span>
                                        <span className="mt-[2px]">
                                            <FaFileImport />
                                        </span>
                                    </label>
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={handleUploadCover}
                                    disabled={cover? false : true}
                                >
                                    <span
                                        style={{
                                            fontFamily:"Negaar-Regular"
                                        }}
                                        className="pr-2"
                                    >
                                        آپلود کاور
                                    </span>
                                    <span className="">
                                        <MdFileUpload />
                                    </span>
                                </Button>
                            </label>

                            <h1 className="pr-2 pt-3">
                                {fileUp?.name}
                            </h1>
                        </div>
                </div>
                <div className="w-[50%] px-5 py-2">
                    <div className="bg-neutral-300 h-[90%] absolute top-5 left-5  w-[590px] rounded-lg overflow-hidden flex flex-col">
                        <div className="h-3/5 bg-cover bg-center" style={{backgroundImage:`url(${userInfo.ResumeCover ? `http://localhost:3001/cover/${userInfo.ResumeCover}` : "/images/Default_background_resume.jpg"})`}}></div>
                        <div className="px-4 py-5 h-[60%]">
                            <div>
                                <h1 className="text-xl text-neutral-700" style={{fontFamily:"Negaar-Bold"}}>
                                    <span>
                                        فایل ضمیمه
                                    </span>
                                </h1>
                                {
                                    userInfo.file &&                            
                                    <div className="text-left pl-5">
                                        <a href={`http://localhost:3001/doc/${userInfo?.file}`}>
                                            {userInfo?.file}
                                        </a>
                                    </div>
                                }
                                {   
                                    !userInfo.file &&                            
                                    <div className="text-center">
                                        <h3 
                                            className="text-lg"
                                            style={{
                                                fontFamily:"Negaar-Regular"
                                            }}
                                        >
                                            <span>
                                                فایل ضمیمه موجود نمی باشد!
                                            </span>
                                        </h3>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default ResumeSetting;
