const express = require("express");
const OrdersRouter =  express.Router();
const OrderService = require("../../services/OrderService/OrderService");
const {requireAuth} = require("../../middleware/jwtAuth");

OrdersRouter
    .route("/orders")
    .get(requireAuth, (req, res)=>{
        const database = req.app.get("db");

        OrderService.getAllOrders(database)
            .then( orders => {
                if(orders.length){
                    return res.status(404).json({
                        error: "There are no orders"
                    });
                };

                return res.status(200).json({
                    orders
                });
            });
    })
    .post((req, res)=>{
        const database = req.app.get("db");
        const {
            order_type,
            customer_first_name,
            customer_last_name,
            customer_mobile_number,
            customer_address,
            customer_city,
            customer_state,
            customer_zip_code,
            subtotal,
            time_placed,
            time_ready,
            order_items,
            date_created,
            customer_id
        } = req.body;
        const newOrder = {
            order_type,
            customer_first_name,
            customer_last_name,
            customer_mobile_number,
            customer_address,
            customer_city,
            customer_state,
            customer_zip_code,
            subtotal,
            time_placed,
            time_ready,
            order_items,
            date_created,
            customer_id
        };

        for(const [key, value] of Object.entries(newOrder)){
            if(value === undefined){
                console.log("error:", key, value)
                return res.status(400).json({
                    error: `${key.split("_").join(" ")} can only have a value or be null`
                });
            };
        };
        console.log(newOrder)
        OrderService.createOrder(database, newOrder)
            .then( createdOrder => {
                return res.status(200).json({
                    createdOrder
                });
            });
    });

OrdersRouter
    .route("/order/:id")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;
        
    })
    .patch((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;
        const {
            order_type,
            customer_first_name,
            customer_last_name,
            customer_mobile_number,
            customer_address,
            customer_city,
            customer_state,
            customer_zip_code,
            subtotal,
            time_placed,
            time_ready,
            order_items,
            date_createdL,
            customer_id
        } = req.body;
        const updateOrder = {
            order_type,
            customer_first_name,
            customer_last_name,
            customer_mobile_number,
            customer_address,
            customer_city,
            customer_state,
            customer_zip_code,
            subtotal,
            time_placed,
            time_ready,
            order_items,
            date_createdL,
            customer_id
        };

        OrderService.getOrderById(database, id)
            .then( order => {
                
                if(!order){
                    return res.status(404).json({
                        error: `Order not found`
                    });
                };

                OrderService.updateOrder(database, updateOrder, id)
                    .then( updatedOrder => {
                        return res.status(200).json({
                            updatedOrder
                        });
                    });
            });
    })
    .delete((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        OrderService.getOrderById(database, id)
            .then( order => {

                if(!order){
                    return res.status(404).json({
                        error: `Order not found`
                    });
                };

                OrderService.deleteOrder(database, id)
                    .then( deletedOrder => {
                        return res.status(200).json({
                            deletedOrder: order
                        });
                    });
            });
    });

module.exports = OrdersRouter;