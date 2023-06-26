import user from "../../../models/user";
import conndb from "../../../middlewire/mongoose";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { name, email, phone } = req.body;

      const p = CryptoJS.AES.encrypt(req.body.password, "secret123").toString();

      const u = new user({
        name: name,
        email: email,
        phone: phone,
        password: p,
      });

      const u1 = await u.save();
      res.status(201).send(u1);
    } catch (error) {
      res.status(400).send({ erroe: "erreor" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
