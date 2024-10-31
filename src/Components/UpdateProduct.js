import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const Upadteproduct=()=>{
    const[name,setname]=useState('')
    const[price,setPrice]=useState('')
    const[category,setcategory]=useState('')
    const[company,setCompany]=useState('')

    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        console.log(params)
        let result=await fetch(`http://localhost:5000/product/${params.id}`)
        result =await result.json()
        setname(result.name)
        setPrice(result.price)
        setcategory(result.category)
        setCompany(result.company)
    }

    const updteProduct=async()=>{
        console.log(name,price,category,company)
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-type':"application/json"
        }
        })
        result =await result.json()
        console.log(result)
        navigate("/")
    }
    return(

        <div className="product">
        <h1 className="inputx">Update Product</h1>
        <input type="text" placeholder="Enter  Product Name" className="inputx" onChange={(e)=>setname(e.target.value)} value={name}/>

        <input type="text" placeholder="Enter  Product price"className="inputx"onChange={(e)=>setPrice(e.target.value)} value={price}/>

        <input type="text" placeholder="Enter  Product category"className="inputx"onChange={(e)=>setcategory(e.target.value)} value={category}/>

        <input type="text" placeholder="Enter  Product company"className="inputx" onChange={(e)=>setCompany(e.target.value)} value={company}/>

        <button className="appButton inputx" onClick={updteProduct}>update Product</button>
        </div>
    )
}
export default Upadteproduct