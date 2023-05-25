const jwt = require("jsonwebtoken");

class JWTFeature {
  constructor() {
    this.secret = "smspoly@123456789";
    this.expiresIn = "7d";
  }

  build(data = { id: "" }) {
    return jwt.sign(data, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  decore(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWTFeature;
