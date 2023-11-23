const jwt = require("jsonwebtoken");
const config=require('../config/config');

const verifyToken=(req,res,next)=>{
    let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token.split(' ')[1],
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.token = decoded;
              next();
            });
}
module.exports={verifyToken};