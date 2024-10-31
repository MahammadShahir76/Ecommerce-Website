import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Addproduct=()=>{
    const[name,setname]=useState('')
    const[price,setPrice]=useState('')
    const[category,setcategory]=useState('')
    const[company,setCompany]=useState('')
    const [Error,setError]=useState(false)
    const navigate=useNavigate()
    const addeproduct= async ()=>{
    
        
    if(!name||!price|!category||!company){
        setError(true);
        return false;
    }        

        const userId=JSON.parse(localStorage.getItem('User'))._id;//storing the unique user id,given by DB
        let result=await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
            "Content-type":"application/json"
        }
    });
    result=await result.json();
    console.log(result)
    navigate("/")
}
    return(

        <div className="product">
        <h1 className="inputx">ADD PRODUCT</h1>
        <input type="text" placeholder="Enter  Product Name" className="inputx" onChange={(e)=>setname(e.target.value)} value={name}/>
        {Error && !name && <span className="invalid-input">Enter valid name</span>}{/**<span className="invalid-input">Enter valid category</span>: This is the JSX code that will be rendered if both conditions (Error is truthy and category is falsy) are met */}

        <input type="text" placeholder="Enter  Product price"className="inputx"onChange={(e)=>setPrice(e.target.value)} value={price}/>
        {Error && !price && <span className="invalid-input">Enter valid price</span>}

        <input type="text" placeholder="Enter  Product category"className="inputx"onChange={(e)=>setcategory(e.target.value)} value={category}/>
        {Error && !category && <span className="invalid-input">Enter valid category</span>}

        <input type="text" placeholder="Enter  Product company"className="inputx" onChange={(e)=>setCompany(e.target.value)} value={company}/>
        {Error && !company && <span className="invalid-input">Enter valid company</span>}

        <button className="appButton inputx" onClick={addeproduct}>Add Product</button>
        </div>
    )
}
export default Addproduct