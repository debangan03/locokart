import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ data });
  } else {
    res.status(400).json({ error: "method error" });
  }
};
export default handler;
