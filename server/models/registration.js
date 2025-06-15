import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    firstName : { type : String, required : true},
    lastName : String,
    age : { type : Number, required : true},
    location : {type : String, required : true},
    mobileNo : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    role : {type : String, required : true, default : "User"},
    password :{type : String, required : true, minlength : 7},
})

export default mongoose.model('Registration', registrationSchema)