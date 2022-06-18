const mongoose = require('mongoose');

const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
}, {
    timestamps: true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){ //cb for call back function
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

//static functions
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar'); //single means that only one file can be uploaded,not an array of files
userSchema.statics.avatarPath=AVATAR_PATH; //making avatar_path publically accessible

const User = mongoose.model('User', userSchema);

module.exports = User;