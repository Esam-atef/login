const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userRouter=require('./Routers/users')

const app=express()
app.use(bodyParser.json())

const uri = "mongodb+srv://essam:123esam123@cluster0.rhjn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToDB=async()=>
{
    try
    {
        mongoose.set('strictQuery',false)
        mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }
    catch(error)
    {
        console.log("the error : ",error)
        process.exit()
    }
}
connectToDB()
app.use('/',userRouter)

app.listen(9094);