import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String, 
        enum:[4, 'Too short, min is 4 characters'], 
        max: [32, 'Too long, max is 32 characters']
    },

    email:{
         type:String,
         unique:true,
         required:true,
    },
    password:{
        type:String, 
        min: [4, 'Too short, min is 4 characters'], 
        max: [32, 'Too long, max is 32 characters'],
        required:true,
    },
    profilePic:{
        type:String,
        required:true,
        default:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    },
    admin:{
        type:Boolean,
        required:true,
        default:false
    },
    hash:{
        String,
    },

    salt:{
        String
}, {timestamps: true});