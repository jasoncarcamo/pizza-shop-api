const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const {NODE_ENV} = require("../../config");

app.use(morgan((NODE_ENV === "production") ? "tiny" : "common"));
app.use(cors());
app.use(express.json());
app.use(helmet());

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