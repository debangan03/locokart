import product from "../../../models/product";
import conndb from "../../../middlewire/mongoose";
const handler = async(req,res)=>{
    let  p1 = await product.find()
    let tshirts = {}
    for (let i of p1) {
        if (i.title in tshirts) {
            if(!tshirts[i.title].color.includes(i.color)&& i.qav>0){
                 tshirts[i.title].color.push(i.color)
            }
            if(!tshirts[i.title].size.includes(i.size)&& i.qav>0){
                tshirts[i.title].size.push(i.size)
           }
        }
        else{
          tshirts[i.title]  = JSON.parse(JSON.stringify(i))
          if(i.qav>0){
            tshirts[i.title].color = [i.color]
            tshirts[i.title].size = [i.size]
          }
        }
    }
    res.status(200).json({tshirts})

}
export default conndb(handler);