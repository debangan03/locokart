import product from "../../../models/product";
import conndb from "../../../middlewire/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      for (let index = 0; index < req.body.length; index++) {
        const p = await product.findByIdAndUpdate(req.body[index]._id,req.body[index])
        res.status(201).send('success');
      }
    } catch (error) {
      res.status(201).send({error: 'error'})
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
