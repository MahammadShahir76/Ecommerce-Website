import React, { useEffect, useState} from "react";
import{useNavigate} from 'react-router-dom'
const Login=()=>{
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const navigate= useNavigate();

    useEffect(()=>{//not to open the login page once th euser is logined,it prevents from opening the login page
        const auth=localStorage.getItem('User');
        if(auth){
            navigate("/")
        }
    },[])


    const handlelogin=async()=>{
        console.log(email,password)
        let result = await fetch('http://localhost:5000/login',{
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("User",JSON.stringify(result))
            navigate('/')
        }else{
            alert("please enter correct details")
        }
    }
    return(
        <div className="product">
        <h1 className="inputx">LOGIN PAGE</h1>
        <input type="text" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email} className="inputxe"/><br/>
        <input type="password" placeholder="enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} className="inputxe"/><br/>
        <button type="button" onClick={handlelogin} className="appButton inputx">Login</button>
        </div>
    )
}
export default Login;