const express = require("express");
const MenuItemsRouter = express.Router();
const {requireAuth} = require("../../middleware/jwtAuth");
const MenuItemsService = require("../../services/MenuItemsService/MenuItemsService");

MenuItemsRouter
    .route("/menu-items")
    .get((req, res)=>{
        const database = req.app.get("db");

        MenuItemsService.getAllMenuItems(database)
            .then( menuItems => {

                return res.status(200).json({
                    menuItems
                });
            });
    })
    .post(requireAuth, (req, res)=>{
        const database = req.app.get("db");
        const {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        } = req.body;
        const newMenuItem = {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        };

        for(const [key, value] of Object.entries(newMenuItem)){
            if(value === undefined || value === ""){

                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        MenuItemsService.createMenuItem(database, newMenuItem)
            .then( createdMenuItem => {
                return res.status(200).json({
                    createdMenuItem
                });
            });
    });

MenuItemsRouter
    .route("/menu-item/:id")
    .get((req, res)=>{
        const id = req.params.id;
        const database = req.app.get("db");

        MenuItemsService.getMenuItemById(database, id)
            .then( menuItem => {
                if(!menuItem){
                    return res.status(404).json({
                        error: `Menu item not found`
                    });
                };

                return res.status(200).json({
                    menuItem
                });
            });
    })
    .patch(requireAuth, (req, res)=>{
        const id = req.params.id;
        const database = req.app.get("db");
        const {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        } = req.body;
        const updateMenuItem = {
            category,
            name,
            description,
            size_small,
            size_medium,
            size_large,
            price_small,
            price_medium,
            price_large,
            ingredients
        };

        for(const [key, value] of Object.entries(updateMenuItem)){
            if(value === undefined || value === ""){
                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        MenuItemsService.getMenuItemById(database, id)
            .then( menuItem => {
                if(!menuItem){
                    return res.status(404).json({
                        error: `Menu item not found`
                    });
                };

                MenuItemsService.updateMenuItem(database, updateMenuItem, id)
                    .then( updatedMenuItem => {
                        return res.status(200).json({
                            updatedMenuItem
                        });
                    });
            });

    })
    .delete(requireAuth, (req, res)=>{
        const id = req.params.id;
        const database = req.app.get("db");

        MenuItemsService.getMenuItemById(database, id)
            .then( menuItem => {
                if(!menuItem){
                    return res.status(404).json({
                        error: `Menu item not found`
                    });
                };

                MenuItemsService.deleteMenuItem(database, id)
                    .then( deletedMenuItem => {
                        return res.status(200).json({
                            deletedMenuItem: menuItem
                        });
                    });
            });
    });

module.exports = MenuItemsRouter;