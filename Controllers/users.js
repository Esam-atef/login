const userModel=require('../Schema/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.register =async (req,res)=>
{
    try
    {
        let newUser=new userModel(req.body)
        const hashedpassword= await bcrypt.hash(req.body.password,10)
        newUser.password=hashedpassword
        let createUser=await newUser.save()
        res.json({message:"The user added successfully",User:createUser})
    }
    catch(error)
    {
        res.status(400).json({message: "Error in registration", error: error.message});
    }
}

exports.login =async (req,res)=>
{
    try
    {
        let user=await userModel.findOne({email:req.body.email})
        if(!user)
        {
            res.status(401).json({message: "invalid email or password"});
        }
        let passwordCheck=await user.comparePasswords(req.body.password)
        if(passwordCheck ===false)
        {
            res.status(401).json({message: "invalid email or password1"});
        }
        const token=jwt.sign({_id:user._id , name:user.name},'secret')
        res.json({message:"login is successfully",user:{name:user.name,email:user.email,token}})
    }
    catch(error)
    {
        res.status(400).json({message: "Error in registration", error: error.message});
    }
}