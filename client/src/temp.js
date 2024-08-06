// import './App.css';
// import{useState , useEffect} from 'react'
// import Axios from 'axios'
// import { Button } from "antd";





// function App() {
//   const [Users , setUsers] = useState([{}])
//   const [name , setName] = useState("")
//   const [age , setAge] = useState(0)
//   const [username , setUserName] = useState("")


//   useEffect(()=>{
//     Axios.get("http://localhost:3001/getUsers").then((response)=>{
//       setUsers(response.data)
//     })
//   },[])

//    const CreateUserHandler = ()=>{
//     Axios.post("http://localhost:3001/addUser" , {
//       name,
//       age,
//       username
//     }).then((response)=>{
//       setUsers([...Users , {
//         username,
//         email,
//         password
//       }])
//     })
//    }

//    const DeleteUserHandler = (e)=>{
//     Axios.delete("http://localhost:3001/deleteUser/" + e)
//     .then(response => {
//       console.log('Delete successful:', response.data);
//     })
//     .catch(error => {
//       console.error('There was an error deleting the user:', error);
//     });
//     }
//   return (
//     <div className="App">
//       <div className='USerDisplay'>
//         {Users.map((user)=>{
//           return(
//             <>
//               <h1>Name: {user.username}</h1>
//               <h1>Age: {user.email}</h1>
//               <h1>UserName: {user.password}</h1>
//               <button onClick={()=>{DeleteUserHandler(user.username)}}>Delete</button>
//             </>
//           )
//         })}
//       </div>
//       <div>
//       </div>
//       <div>
//         <input type="text" placeholder='username...' onChange={(e)=>{setName(e.target.value)}} />
//         <input type="email" placeholder='email...' onChange={(e)=>{setAge(e.target.value)}} />
//         <input type="password" placeholder='password...' onChange={(e)=>{setUserName(e.target.value)}} />
//         <button onClick={CreateUserHandler}> Create User </button>
//       </div>
//     </div>
//   );
// }

// export default App;
