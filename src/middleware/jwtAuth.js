const CustomerService = require("../services/CustomerService/CustomerService");
const JwtService = require("../services/JwtService/JwtService");

function requireAuth( req, res, next){
    const authToken = req.get("authorization") || "";
    let bearerToken;

    if(!authToken.toLowerCase().startsWith("bearer ")){
        return res.status(401).json({ error: "Missing bearer token" });
    } else {
        bearerToken = authToken.slice( 7, authToken.length);
    };
    console.log(bearerToken)
    try{
        const payload = JwtService.verifyToken(bearerToken);
        console.log(payload)
        const email = payload.sub;

        console.log("email", email);
        
        CustomerService.getCustomerByEmail( req.app.get("db"), email)
            .then( customer => {
                if(!customer){
                    return res.status(401).json({
                        error: "Unauthorized request"
                    });
                };

                req.user = customer;

                next();
            })
            .catch( err => {
                next(err);
            })

    } catch( error){
        res.status(401).json({ error: "Unauthorized request"});
    };
};

module.exports = {
    requireAuth
};