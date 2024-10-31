//this is nodejs used for the backend of the project
const express=require('express')
require('./db/Config');
const User=require("./db/User");
const cors = require('cors');
const Product=require('./db/Product')

const app=express()
app.use(cors())
app.use(express.json())

app.post("/register",async(req,resp)=>{
    let user=new User(req.body);
    let result =await user.save();
    resp.send(result)
})

app.post('/login',async(req,resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user)
        }else{
            resp.send({result:'No User found'})
        }
    }else{
        resp.send({result:'No User foundee'})
    }

})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);  // Note the capital "P" in "Product" is the model of the DB
    let result = await product.save();
    resp.send(result);
});

app.get("/products",async (req,resp)=>{
    let products= await Product.find()//puts all the Product in Db into products variable
    if(products.length>0 ){
        resp.send(products)
    }else{
        resp.send({product:"No product found"})
    }
})

app.delete("/product/:id",async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get("/product/:id",async (req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"No record found"})
    }
})

app.put("/product/:id",async (req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
})

app.get("/search/:key",async (req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

app.listen(5001);