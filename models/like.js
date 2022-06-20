const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    }
})