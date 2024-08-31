import { useEffect, useState } from "react";
import Axios from 'axios'

// this is a test page and not useing anymore


const TestFileUpdate = () => {
    
    const [fileUp , setFile] = useState()
    const [userInfo , setUserInfo] = useState()
    const token = localStorage.getItem('token')
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
    useEffect(()=>{
        Axios.get("http://localhost:3001/getUsers").then((response)=>{
            const data = response.data ;
            data.forEach((user)=>{
                if(user.token === token){
                    setUserInfo(user)
                }
            })
        })
    },[])

    const formData = new FormData()
    formData.append('email', userInfo?.email)
    formData.append('username', userInfo?.username)
    formData.append('password', userInfo?.password)
    formData.append('token', userInfo?.token)
    formData.append('act', userInfo?.act)
    formData.append('imageAddress', userInfo?.imageAddress)
    formData.append('ResumeCover', userInfo?.ResumeCover)
    formData.append('PhoneNumber', userInfo?.PhoneNumber)
    formData.append('bookmarkId', userInfo?.bookmarkId)
    formData.append('bookmarks', userInfo?.bookmarks)
    formData.append('Birthday', userInfo?.Birthday)
    formData.append('degree', userInfo?.degree)
    formData.append('file', fileUp)



    const handleUpload = (e)=>{
        Axios.delete(`http://localhost:3001/deleteUser/${token}`)
        Axios.post("http://localhost:3001/UploadFile" , formData)
    }

    return (
        <>
            <div className="">
                <input type="file" accept=".pdf" onChange={handleFileChange}/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!error && <button onClick={handleUpload}>Upload</button>}
                
            </div>
            {/* <img src={`http://localhost:3001/images/${userInfo?.imageAddress}`} alt="imageUser" /> */}
            <a href={`http://localhost:3001/doc/${userInfo?.file}`}>
                {userInfo?.file}
            </a>
        </>
    );
  }

  export default TestFileUpdate;