import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 const Productlist=()=>{
    const [products,setProducts]=useState([])
    
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts=async()=>{
        let result =await fetch("http://localhost:5000/products")
        result=await result.json()
        setProducts(result);
    }
   const deleteProduct= async (id)=>{
        let result= await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result= await result.json()
        if(result){
           getProducts();
        }
   }
   const searchHandle=async (e)=>{
    let key=e.target.value;
    if(key){
    let result=await fetch(`http://localhost:5000/search/${key}`)
    result=await result.json();
    if(result){
        setProducts(result)
    }
   }
   else{
    getProducts()
   }
}
    return(
        <div className="product-list">
        <h1>Product list</h1>
        <input type="text" placeholder="Search Product" className="search-product-box"
        onChange={searchHandle}
        />
        <ul className="tableee">
            <li>Sl.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
        {
            products.length>0?products.map((items,index)=>
            <ul  key={items._id} className="tableee">
            <li>{index+1}</li>
            <li>{items.name}</li>
            <li>{items.price}</li>
            <li>{items.category}</li>
            <li>{items.company}</li>
            <li><button onClick={()=>deleteProduct(items._id)}>delete</button>
            <Link to={"/update/"+items._id}>update</Link>
            </li>
         
        </ul>
            )
            :<h1>NO PRODUCT FOUND</h1>
 }
        </div>
    )
 }
 export default Productlist