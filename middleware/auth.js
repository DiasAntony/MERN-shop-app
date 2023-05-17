const jwt = require("jsonwebtoken");
const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //   console.log(decoded); // {id: 'aia73887r3efijbh' , iat:7357691 , exp:735817458 }
    //   id is our user id , we used for token encoded

      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token Expired");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

exports.admin = (req, res, next) => {
  // req.user come from protect 
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
