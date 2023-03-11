const tokenService = require("../services/token.service");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      // const token = req.headers.authorization.split(" ")[1];
      const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

      if (!token) {
        return res.status(400).json({ message: "Пользователь не авторизован" });
      }

      const { role: userRoles } = tokenService.validateRefresh(token);

      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          return (hasRole = true);
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа!" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Пользователь не авторизован" });
    }
  };
};
