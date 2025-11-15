const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "smartpay-dev-secret",
  tokenExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

module.exports = env;

