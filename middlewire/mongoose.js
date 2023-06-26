const mongoose = require('mongoose')

const conndb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  } else {
    mongoose
      .connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log("connected to db"))
      .catch((e) => console.log(e));
  }
};
export default conndb;
