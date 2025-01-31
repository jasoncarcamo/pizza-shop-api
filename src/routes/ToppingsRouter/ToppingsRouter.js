const express = require("express");
const ToppingsRouter =  express.Router();
const {} = require ("../../middleware/jwtAuth");

ToppingsRouter
    .route("/toppings")
    .get((req, res)=>{
        const database = req.app.get("db");


    })
    .post((req, res)=>{

    })
    .patch((req, res)=>{

    })
    .delete((req, res)=>{

    });