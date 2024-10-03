const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema

const userSchema=new Schema
({
    name:String,
    age:Number,
    password:String,
    phone: {type:String ,unique:true},
    email: {type:String ,unique:true}
})

userSchema.methods.comparePasswords= async function(password)
{
    return await bcrypt.compare(password,this.password)
}
module.exports=mongoose.model('Users',userSchema)