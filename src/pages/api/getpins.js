import pin from "../../../models/pin";
import conndb from "../../../middlewire/mongoose";
const handler = async(req,res)=>{
    let  pins = await pin.find();
    let pincity = {};
  for (let i of pins) {
    if (Object.keys(pincity).includes(i.pincode)) {
      pincity[i.pincode] = { state: i.state ,city: i.city };
    //   pincity[i.pincode]= { city: i.city };
    } else {
      pincity[i.pincode] = {};
      pincity[i.pincode] = { state: i.state ,city: i.city };
    }
  }
    res.status(200).json( pincity)
}
export default conndb(handler);