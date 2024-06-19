const jwt = require("../utils/jwt")

const auth = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("Authorization token is missing");
    }
    try {
      const decoded = jwt.verifyToken(token);
      req.user = decoded;
    } catch (err) {
    console.log(err)
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
  module.exports = auth;