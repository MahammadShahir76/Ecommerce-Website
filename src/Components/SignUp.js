import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");


  const navigate=useNavigate()//useeffect is used not to not to open singup page once signed in
  useEffect(()=>{
    const auth=localStorage.getItem('User')
    if(auth){
      navigate('/')
    }
  })


  const collection = async () => {
    let result= await fetch('http://localhost:5000/register', {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  localStorage.setItem("User",JSON.stringify(result));//this line stores the data in the localStorage,so that it retains even after refreshing the page
  if(result){
    navigate('/');
  }
}
  return (
    <div className="product">
      <h1  className="inputx">SIGNUP PAGE</h1>
      <input
       
        type="text"
        placeholder="Enter name"
        onChange={(e) => setname(e.target.value)}
        value={name}
      className="inputx"/>
      <input
       
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      className="inputx"/>
      <input
       
        type="password"
        placeholder="Enter password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
      className="inputx"/>
      <button type="button" onClick={collection} className="appButton inputx">
        SUBMIT
      </button>
    </div>
  );
}
