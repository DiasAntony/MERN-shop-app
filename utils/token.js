const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  // {id:id} id variable : id from argument user Id
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
