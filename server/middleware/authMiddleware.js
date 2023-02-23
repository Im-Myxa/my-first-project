const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = tokenService.validateAccess(token);
    if (!decodedData) {
      return res.status(401).json({ message: '"Пользователь не авторизован"' });
    }
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Пользователь не авторизован" });
  }
};
