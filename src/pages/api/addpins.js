import pin from "../../../models/pin";
import conndb from "../../../middlewire/mongoose";
const handler = async(req,res)=>{
   if(req.method=='POST'){
    try {
        const p =  new pin(req.body);
        const pins = await p.save();
        res.status(201).json({pins})
    } catch (error) {
        res.status(201).send({error: 'error '})
    }
   }
   else{
    res.status(201).send({error: 'error method'})
   }
}
export default conndb(handler);