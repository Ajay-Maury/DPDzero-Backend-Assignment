const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // check if token in null
  if (token == null) {
    return res.status(401).json({
      status: "error",
      code: "INVALID_TOKEN",
      message: "Invalid access token provided.",
    });
  }

  // validate token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        code: "INVALID_TOKEN",
        message: "Invalid access token provided.",
      });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
