const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL)
const pinSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

mongoose.models = {};
export default mongoose.model("pin", pinSchema);
