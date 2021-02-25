const express = require("express");
const CustomerRouter = express.Router();
const CustomerService = require("../../services/CustomerService/CustomerService");
const {requireAuth} = require("../../middleware/jwtAuth");

CustomerRouter
    .route("/customer/:id")
    .all(requireAuth)
    .get((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        CustomerService.getCustomerById(database, id)
            .then( customer => {
                if(!customer){
                    return res.status(404).json({
                        error: "Customer not found"
                    });
                };

                delete customer.password;

                return res.status(200).json({
                    customer
                });
            });
    })
    .patch((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;
        const {
            first_name,
            last_name,
            email,
            mobile_number,
            address,
            city,
            state,
            zip_code,
            points
        } = req.body;
        const updateCustomer = {
            first_name,
            last_name,
            email,
            mobile_number,
            address,
            city,
            state,
            zip_code,
            points
        };

        for(const [key, value] of Object.entries(updateCustomer)){
            if(value === undefined || value === ""){
                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        CustomerService.getCustomerById(database, id)
            .then( customer => {
                
                if(!customer){
                    return res.status(404).json({
                        error: "Customer not found"
                    });
                };

                CustomerService.updateCustomer(database, updateCustomer, id)
                    .then( updatedCustomer => {

                        delete updateCustomer.password;

                        return res.status(200).json({
                            updatedCustomer
                        });
                    });
            })
    })
    .delete((req, res)=>{
        const database = req.app.get("db");
        const id = req.params.id;

        CustomerService.getCustomerById(database, id)
            .then( customer => {

                if(!customer){
                    return res.status(404).json({
                        error: "Customer not found"
                    });
                };

                CustomerService.deleteCustomer(database, id)
                    .then( deletedCustomer => {

                        delete customer.password;

                        return res.status(200).json({
                            deletedCustomer: customer
                        });
                    });
            })
    });

module.exports = CustomerRouter;