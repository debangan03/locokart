import user from "../../../models/user";
import conndb from "../../../middlewire/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method == "POST") {
    

    const u = await user.findOne({ email: req.body.email });
   
    if (u) {
      if (req.body.email == u.email && req.body.password == CryptoJS.AES.decrypt(u.password, 'secret123').toString(CryptoJS.enc.Utf8)) {
        var token = jwt.sign({email: u.email, name: u.name }, process.env.JWT_SECRET);
        res.status(200).json({success: true,token});
      } else {
        res.status(400).json({ success: false, error: "invalid creaditionals" });
      }
    } else {
      res.status(400).json({ success: false, error: "user not registered" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
