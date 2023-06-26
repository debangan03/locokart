import conndb from "../../../middlewire/mongoose";
import jsonwebtoken from 'jsonwebtoken'
import user from "../../../models/user";
const handler = async(req,res)=>{
    if(req.method=='POST'){
        const token = req.body.token;
        const data = jsonwebtoken.verify(token,process.env.JWT_SECRET);
       
        let users  = await user.find({email:data.email})
       
        
        res.status(200).json({users})
    }
    else{
        res.status(400).json({error:'method error'})
    }
    

}
export default conndb(handler);