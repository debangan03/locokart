
import conndb from "../../../middlewire/mongoose";
import { instance } from "../../../utils/instances";
import product from "../../../models/product";


const handler = async (req, res) => {
  if (req.method == "POST") {

    if(req.body.subtotal<=0){
      res.status(200).json({ success:false,error: "Cart empty ! Please Build your cart" });
      return;
    }
    if(req.body.phone.length!==10 && Number.isInteger(Number(req.body.phone))){
      res.status(200).json({ success:false,error: "please enter your 10 digit phone number" });
      return;
    }
    if(req.body.pin.length!==6 && Number.isInteger(Number(req.body.pin))){
      res.status(200).json({ success:false,error: "please enter your 6 digit pin code" });
      return;
    }
    let cart = req.body.cart;
    let sum = 0;
    let prod;
    for (let item in req.body.cart) {
      prod = await product.findOne({ slug: item });
      sum+=cart[item].price*cart[item].qty
      if(prod.qav<cart[item].qty){
        res.status(200).json({ success:false,error: "Some items of your cart are out of stock" });
        return;
      }
      if(prod.price!=cart[item].price){
        res.status(200).json({ success:false,error: "Price of the items in your cart have been changed please try again" });
        return;
      }
    }
    if(sum!==req.body.subtotal){
      res.status(200).json({ success:false,error: "Price of the items in your cart have been changed please try again" });
      return;
    }
    const options = {
      amount: Number(req.body.subtotal * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    

    res.status(200).json({ success: true, order });
  } else {
    res.status(400).send({ error: "error" });
  }
};
export default conndb(handler);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
