const mongoose  = require('mongoose');
// mongoose.connect(process.env.MONGO_URL)
const userSchema  = new mongoose.Schema(    {
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
    
},{timestamps:true})

mongoose.models={}
export default mongoose.model('user',userSchema);