import { Button, Input, Popconfirm } from "antd";
import Axios from 'axios'
import { useEffect, useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { useMessageApi } from "../../Tools/MessageProvider";
import { HiDocumentDownload } from "react-icons/hi";
import { MdTextsms } from "react-icons/md";


const Article = () => {
    const messageApi = useMessageApi();
    const { TextArea } = Input;
    const [file , setFile] = useState()
    const [title , setTitle] = useState()
    const [Link , setLink] = useState()
    const [Summary , setSummary] = useState()
    const [error , setError] = useState()
    const [titleError , setTitleError] = useState()
    const [LinkError , setLinkError] = useState()
    const [id , setID] = useState()
    const [allUserArticle , setAllUserArticle] = useState([])
    const token = localStorage.getItem('token')


    useEffect(()=>{
        Axios.get(`http://localhost:3001/getUserArticles/${token}`).then((response)=>{
            setAllUserArticle(response.data)
        })
    },[])

    useEffect(() => {
        const truncatedUuid = crypto.randomUUID().slice(0, 8);
        setID(truncatedUuid)
    }, []);

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
            setError('لطفا فایل با فرمت PDF آپلود کنید');
            setFile(null);
        } else {
            setError('');
            setFile(selectedFile);
        }
    };
    const formData = new FormData()
    formData.append('tokenRef', token)
    formData.append('type', "File")
    formData.append('title', title)
    formData.append('Date', Date.now())
    formData.append('Summary', Summary)
    formData.append('id', id)
    formData.append('file', file)
    

    const handleUpload = () => {
        if(!title){
            setTitleError("عنوانی برای فایل یا لینک خود انتخاب کنید!")
        }else{
            if(Link){
                if((Link.includes("http://") || Link.includes("https://"))){
                    Axios.post('http://localhost:3001/addArticleLink', {
                        tokenRef: token,
                        type: Link? "Link" : "File",
                        title: title,
                        Summary: Summary,
                        Link: Link ? Link : null,
                        file: file ? file : null,
                        id:id,
                        Date: Date.now()
                    }).then(()=>{
                        messageApi.open({
                            type: 'success',
                            content: 'آپلود با موفقیت انجام شد!',
                            style: {
                                marginTop: '10vh',
                              },
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                }else{
                    setLinkError("لینک معتبر نیست!")
                }
            }
            if(file){
                Axios.post('http://localhost:3001/UploadArticleFile', formData)
                .then(()=>{
                    messageApi.open({
                        type: 'success',
                        content: '!آپلود با موفقیت انجام شد',
                        style: {
                            marginTop: '10vh',
                          },
                      });
                      setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
            }
        }
    };
    const confirm = (e) => {
        Axios.delete(`http://localhost:3001/deleteArticle/${e}`).then((response)=>{
            messageApi.open({
                type: 'success',
                content: '!حذف با موفقیت انجام شد',
                style: {
                    marginTop: '10vh',
                  },
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
      };
      
    return (
        <div className="h-[68vh] rounded-b-xl px-8 py-5 flex border-dashed border-neutral-400 border-2 border-t-0 bg-neutral-200">
            <div className="w-1/2 h-full p-3">
                <h1 className="text-2xl text-neutral-600" style={{fontFamily:"Titr"}}>افزودن مقاله و جزوه</h1>

                <div className="gap-1 text-xl text-neutral-600 px-5 py-1 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h2>عنوان فایل</h2>
                    <Input placeholder="عنوان..." style={{width:"400px",fontFamily:"Vazir"}} onChange={handleChangeTitle}/>
                </div>
                {
                    titleError && 
                    <div className="text-red-500 pr-8 flex gap-2 pt-3" style={{fontFamily:"Negaar-Regular"}}> 
                    <span className="pt-[4px]">
                        <FaCircleXmark/>
                    </span>
                        {titleError}
                    </div>
                }

                <div className="gap-1 text-xl text-neutral-600 px-5 py-1 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h2>آپلود به صورت لینک</h2>
                    <Input placeholder="http://*****.pdf" style={{width:"400px", fontFamily:"Vazir"}} disabled={file? true : false} onChange={handleChangeLink}/>
                </div>
                {
                    LinkError && 
                    <div className="text-red-500 pr-8 flex gap-2 pt-3" style={{fontFamily:"Negaar-Regular"}}> 
                    <span className="pt-[4px]">
                        <FaCircleXmark/>
                    </span>
                        {LinkError}
                    </div>
                }
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
                {
                    file &&                 
                    <div className="pr-8 flex gap-2">
                        <span className="pt-[5px] text-lime-600">
                            <IoIosCheckmarkCircle/>
                        </span>
                        {file?.name}
                    </div>
                }
                {
                    error && 
                    <div className="text-red-500 pr-8 flex gap-2 pt-3" style={{fontFamily:"Negaar-Regular"}}> 
                    <span className="pt-[4px]">
                        <FaCircleXmark/>
                    </span>
                        {error}
                    </div>
                }
                <div className="gap-1 text-xl text-neutral-600 px-5 pt-1 pb-3 flex flex-col" style={{fontFamily:"Negaar-Regular"}}>
                    <h1>توضیحات</h1>
                    <TextArea rows={4} placeholder="افزودن توضیحات..." onChange={handleChangeTextArea} style={{fontFamily:"Vazir"}}/>
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
            <div className="w-1/2 h-full bg-neutral-100 rounded-md border-2 border-dashed border-neutral-300 p-4 overflow-y-scroll">
                <h1 className="text-2xl text-neutral-700" style={{fontFamily:'Titr'}}>
                    مقالات و جزوه ها
                </h1>
                {
                    allUserArticle && 
                    <div className="flex flex-col gap-3 py-4">
                        {allUserArticle.map((art)=>{
                            return(
                                <div className="w-full border-2 border-solid border-neutral-50 rounded-md p-3 text-left relative">
                                    <div dir="ltr" className="absolute left-3 top-2">
                                        {art?.Date ? new Date(art.Date).toLocaleString() : ""}
                                    </div>
                                    {
                                        art.type === "File" &&                              
                                        <a href={`http://localhost:3001/Article/${art?.file}`} className="flex gap-2 w-auto" style={{fontFamily:'ComicSans , Vazir'}}>
                                            <span className="text-lg pt-[4px]">
                                                <HiDocumentDownload/>
                                            </span>
                                            <span>
                                                {art.title}
                                            </span>
                                        </a>
                                    }
                                    {
                                        art.type === "Link" &&                              
                                        <a href={art?.Link} target="_blank" className="flex gap-2 w-auto" style={{fontFamily:'ComicSans , Vazir'}}>
                                            <span className="text-lg pt-[4px]">
                                                <HiDocumentDownload/>
                                            </span>
                                            <span>
                                                {art.title}
                                            </span>
                                        </a>
                                    }
                                    <div className="text-sm pr-8 py-3 flex gap-2 text-right">
                                        <span className="pt-[4px] text-neutral-700">
                                            <MdTextsms/>
                                        </span>
                                        <span>
                                            {art.Summary}
                                        </span>
                                    </div>
                                    <Popconfirm
                                        title="حذف مقاله"
                                        description="مطئمن هستید که میخواهید این آیتم را حذف کنید؟"
                                        onConfirm={()=>{confirm(art?.id)}}
                                        okText="بله"
                                        cancelText="خیر"
                                        placement="right"
                                    >
                                        <Button
                                            // onClick={()=>{handleDeleteArticle(art?.id)}}
                                            type="primary"
                                            danger
                                            style={{width:"15%"}}
                                            block
                                        >
                                            <span style={{fontFamily:'Negaar-Bold'}}>
                                                حذف
                                            </span>
                                        </Button>
                                    </Popconfirm>

                                </div>
                            )
                        })}
                    </div>
                }
                {
                    !allUserArticle[0] && 
                    <div className="flex flex-col gap-3 py-4">
                        <h1 className="text-red-700 m-auto" style={{fontFamily:"Vazir"}}>مقاله ای موجود نمی باشد!</h1>
                    </div>
                }
            </div>
        </div> 
    );
  }

  export default Article;
