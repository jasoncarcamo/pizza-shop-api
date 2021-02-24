const express = require("express");
const RegisterRouter = express.Router();
const CustomerService = require("../../services/CustomerService/CustomerService");
const BcryptService = require("../../services/BcryptService/BcryptService");
const JwtService = require("../../services/JwtService/JwtService");

RegisterRouter
    .route("/register")
    .post((req, res)=>{
        const {
            first_name,
            last_name,
            mobile_number,
            email,
            password
        } = req.body;

        const newCustomer = {
            first_name,
            last_name,
            mobile_number,
            email,
            password
        };
        const database = req.app.get("db");

        for(const [key, value] of Object.entries(newCustomer)){
            if(!value){
                return res.status(400).json({
                    error: `Missing ${key.split("_").join(" ")}`
                });
            };
        };

        CustomerService.getCustomerByEmail(database, newCustomer.email)
            .then( dbCustomer => {

                if(dbCustomer){
                    return res.status(400).json({
                        error: `${newCustomer.email} is already registered.`
                    });
                };

                BcryptService.hashPassword(newCustomer.password)
                    .then( hashedpassword => {

                        newCustomer.password = hashedpassword;

                        CustomerService.createCustomer(database, newCustomer)
                            .then( createdCustomer => {

                                delete createdCustomer.password;

                                const subject = createdCustomer.email;
                                const payload = {
                                    user: createdCustomer.email,
                                    type: "customer"
                                };

                                return res.status(200).json({
                                    token: JwtService.createToken(subject, payload),
                                    createdCustomer
                                });
                            });
                    });
            });

    });

module.exports = RegisterRouter;