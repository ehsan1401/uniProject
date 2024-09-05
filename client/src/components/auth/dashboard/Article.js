import { Button, Input } from "antd";
import Axios from 'axios'
import { useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";

const Article = () => {
    const { TextArea } = Input;
    const [file , setFile] = useState()
    const [title , setTitle] = useState()
    const [Link , setLink] = useState()
    const [Summary , setSummary] = useState()
    const [error , setError] = useState()
    const token = localStorage.getItem('token')


    const handleChangeLink = (e)=>{
        setLink(e.target.value)
    }
    const handleChangeTextArea = (e)=>{
        setSummary(e.target.value)
    }
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value)
    }


    
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

 
    
    
    const formData = new FormData()
    formData.append('tokenRef', token)
    formData.append('type', Link? "Link" : "File")
    formData.append('title', title)
    formData.append('Date', Date.now)
    formData.append('Summary', Summary)
    if(Link){
        formData.append('Link', Link )
    }
    if(file){
        formData.append('file', file)
    }

    const handleUpload = () => {

        if(Link){
            Axios.post('http://localhost:3001/addArticleLink' , formData)

        }else{

            Axios.post('http://localhost:3001/UploadArticleّFile' , formData)

        }
    };
    return (
        <div className="h-[65vh] rounded-b-xl px-8 py-5 flex border-dashed border-neutral-400 border-2 border-t-0 bg-neutral-200">
            <div className="w-1/2 h-full bg-lime-500 p-3">
                <h1 className="text-2xl text-neutral-600" style={{fontFamily:"Titr"}}>افزودن مقاله و جزوه</h1>

                <div className="gap-1 text-xl text-neutral-600 px-5 py-1 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h2>عنوان فایل</h2>
                    <Input placeholder="عنوان..." style={{width:"400px"}} onChange={handleChangeTitle}/>
                </div>

                <div className="gap-1 text-xl text-neutral-600 px-5 py-1 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h2>آپلود به صورت لینک</h2>
                    <Input placeholder="عنوان..." style={{width:"400px"}} disabled={file? true : false} onChange={handleChangeLink}/>
                </div>
                <div className="gap-3 text-xl text-neutral-600 px-5 py-1 flex" style={{fontFamily:"Negaar-Regular"}}>
                    <h2>آپلود به صورت فایل</h2>
                    <label class="flex gap-3 w-28">
                        <input type="file" accept=".pdf" class="hidden" onChange={handleFileChange} id="coverInput"/>
                        <Button
                            type="primary"
                            disabled={Link? true : false}
                        >
                            <label for="coverInput" class="cursor-pointer w-full text-sm text-neutral-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 flex"
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

                    </label>
                </div>
                <div className="gap-1 text-xl text-neutral-600 px-5 py-1 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h1>توضیحات</h1>
                    <TextArea rows={4} placeholder="افزودن توضیحات..." onChange={handleChangeTextArea}/>
                </div>

                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={file || Link? false : true}
                    block
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

            </div>
            <div className="w-1/2 h-full bg-red-600">
                {Link}
            </div>
        </div> 
    );
  }

  export default Article;
