require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || "fweffqfqfewrg",
    NODE_ENV: process.env.NODE_ENV
};