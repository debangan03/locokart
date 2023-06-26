import product from "../../../models/product";
import conndb from "../../../middlewire/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      for (let index = 0; index < req.body.length; index++) {
        const p = new product(req.body[index]);
        const p1 = await p.save();
        res.status(201).send(p1);
      }
    } catch (error) {
      res.status(201).send({error: 'error '})
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
