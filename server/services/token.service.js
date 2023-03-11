const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(id, role) {
    const payload = { id, role };
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: 3600,
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"), {
      expiresIn: 3600,
    });
    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async save(userId, refreshToken) {
    const tokenData = await Token.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({ userId, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
