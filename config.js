require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://jason:carcamo@localhost/pizza-shop-api",
    JWT_SECRET: process.env.JWT_SECRET || "fweffqfqfewrg",
    NODE_ENV: process.env.NODE_ENV || "development"
};