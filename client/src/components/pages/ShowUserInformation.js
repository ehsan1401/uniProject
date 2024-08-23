import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Navigation from "../Tools/NavBar";

const ShowUserInformation = () => {
    const [Users , setUsers] = useState()
    useEffect(()=>{
        Axios.get("http://localhost:3001/getUsers").then((response)=>{
          setUsers(response.data)
        })
      },[])

    const { userBookmarkId } = useParams();

    return (
        <>
            <Navigation/>
            {Users?.map((User)=>{
                if(User.bookmarkId === userBookmarkId){
                    return(
                        <>
                            <p>
                                {User.email}
                            </p>
                        </>
                    )
                }
            })}
        </>
    );
  }

  export default ShowUserInformation;