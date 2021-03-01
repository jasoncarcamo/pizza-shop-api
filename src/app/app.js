const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const {NODE_ENV} = require("../../config");

const RegisterRouter = require("../routes/AuthRouters/RegisterRouter");
const LogInRouter = require("../routes/AuthRouters/LogInRouter");
const CustomerRouter = require("../routes/CustomerRouter/CustomerRouter");
const MenuItemsRouter = require("../routes/MenuItemsRouter/MenuItemsRouter");
const OrdersRouter = require("../routes/OrdersRouter/OrdersRouter");

app.use(morgan((NODE_ENV === "production") ? "tiny" : "common"));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(helmet());

//Authenthication routes
app.use("/api", RegisterRouter);
app.use("/api", LogInRouter);

app.use("/api", CustomerRouter);
app.use("/api", MenuItemsRouter);
app.use("/api", OrdersRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;

    if (NODE_ENV === 'production') {
      response = { error: 'Server error' };
    } else {
      console.error(error)
      response = { error: error.message, object: error };
    };

    res.status(500).json(response);
});

module.exports = app;