const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      // const { refresh_token: refreshToken } = req.body;
      const decoded = tokenService.validateRefresh(token);

      req.userId = decoded.id;

      next();
    } catch (error) {
      return res.json({
        message: "Нет доступа.",
      });
    }
  } else {
    return res.json({
      message: "Нет доступа.",
    });
  }
};
