const mongoose  = require('mongoose');
// mongoose.connect(process.env.MONGO_URL)
const productSchema  = new mongoose.Schema(    {
    title:{
        type:String,
        required:true,

    },
    descp:{
        type:String
    },
    slug:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    size:String,
    color:String,
    price:Number,
    qav:Number,
    category:String
    
})

mongoose.models={}
export default mongoose.model('product',productSchema);