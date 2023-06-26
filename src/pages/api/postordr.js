import Order from "../../../models/Order";
import conndb from "../../../middlewire/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { email, oid, address, subtotal,cart } = req.body;
      const o = new Order({
        email: email,
        oid: oid,
        address: address,
        amount: subtotal,
        products:cart,
      });
      const o1 = await o.save();
      res.status(201).json({ o1});
    } catch (error) {
      res.status(201).send({error: 'error'})
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
