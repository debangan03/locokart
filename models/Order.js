const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    oid: { type: String, required: true },
    paymentinfo: { type: Object,default:{}},
    products: {type:Object,required:true},
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "initiated" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
