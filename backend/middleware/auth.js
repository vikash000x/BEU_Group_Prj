import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, "amir");
    //console.log(token_decode);
    req.body.collegeId = token_decode.id;
    //console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleware;
