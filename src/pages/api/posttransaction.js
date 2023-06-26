import crypto from "node:crypto";
import { instance } from "../../../utils/instances";
import Order from "../../../models/Order";
import product from "../../../models/product";
export default async function handler(req, res) {
  

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
    const payinfo = await instance.payments.fetch(razorpay_payment_id);

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedsigneture = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");
  const auth = expectedsigneture === razorpay_signature;
  if (auth) {
    
    
    let order = await Order.findOneAndUpdate({oid:razorpay_order_id},{status:'paid',paymentinfo:payinfo});
    let prod  = order.products;
    for(let slug in prod){
      await product.findOneAndUpdate({slug:slug},{$inc:{"qav":-prod[slug].qty}})
    }
    res.redirect(
      `/Order/?id=${order._id}&cc=1`
    );
    
  } else {
    res.redirect(
      `/`
    );
  }


}
