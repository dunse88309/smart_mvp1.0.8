const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const routes = require("./routes");
const auth = require("./controllers/authController");
const checkout = require("./controllers/checkoutController");
const dashboard = require("./controllers/dashboardController");
const user = require("./controllers/userController");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin || "*",
  })
);
app.use(express.json());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`SmartPay backend listening on port ${env.port}`);
});


