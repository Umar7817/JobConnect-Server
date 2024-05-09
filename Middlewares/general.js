const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.userId = data._id;
    return next();
    
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
}

module.exports = { isLoggedIn };