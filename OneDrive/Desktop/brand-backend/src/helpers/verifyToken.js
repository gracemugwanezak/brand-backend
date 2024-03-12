import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  jwt.verify(token, "YOUR_SECRET", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach decoded user information to the request object
    req.user = decoded;
    next();
  });
};

export { verifyToken };
