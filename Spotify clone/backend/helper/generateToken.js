const jwt = require("jsonwebtoken");

exports.generateToken = async (id) => {
  let token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // expires in 24 hours
  });
  return token;
};
