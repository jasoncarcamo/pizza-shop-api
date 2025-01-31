const express = require("express");
const ToppingsRouter =  express.Router();
const {requireAuth} = require ("../../middleware/jwtAuth");
const ToppingsService = require("../../services/ToppingsServices/ToppingsServices");

ToppingsRouter
    .route("/toppings")
    .get((req, res)=>{
        const database = req.app.get("db");

        ToppingsService.getAllToppings(database)
            .then(allToppings => {
                return res.status(200).json({
                    toppings: allToppings
                });
            });
    })
    .post(requireAuth, (req, res)=>{
        const database = req.app.get("db");
        const {
            category,
            name,
            price,
            extra_price
        } = req.body;

        const newTopping = {
            category,
            name,
            price,
            extra_price
        } = req.body;
        
        for(const [key, value] of Object.entries(newTopping)){
            if(value === undefined || value === ""){
                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        ToppingsService.createTopping(database, newTopping)
            .then( createdTopping => {
                return res.status(200).json({createdTopping});
            });
    })
    .patch(requireAuth, (req, res)=>{
        const database = req.app.get("db");
        const {
            id,
            category,
            name,
            price,
            extra_price
        } = req.body;

        const updateTopping = {
            id,
            category,
            name,
            price,
            extra_price
        } = req.body;

        for(const [key, value] of Object.entries(updateTopping)){
            if(value === undefined || value === ""){
                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        ToppingsService.updateTopping(database, updateTopping)
            .then( updatedTopping => {
                return res.status(200).json({updatedTopping});
            });
    })
    .delete(requireAuth, (req, res)=>{
        const database = req.app.get("db");
        const {
            id,
            category,
            name,
            price,
            extra_price
        } = req.body;

        const deleteTopping = {
            id,
            category,
            name,
            price,
            extra_price
        } = req.body;

        if(deleteTopping.id === undefined || deleteTopping.id === ""){
            return res.status(400).strictContentLength({
                error: "Topping does not exist"
            });
        };

        ToppingsService.deleteTopping(database, deleteTopping)
    });

module.exports = ToppingsRouter;