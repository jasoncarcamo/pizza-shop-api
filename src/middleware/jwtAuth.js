const CustomerService = require("../services/CustomerService/CustomerService");

function requireAuth( req, res, next){
    const authToken = req.get("authorization") || "";
    let bearerToken;

    if(!authToken.toLowerCase().startsWith("bearer ")){
        return res.status(401).json({ error: "Missing bearer token" });
    } else {
        bearerToken = authToken.slice( 7, authToken.length);
    };

    try{
        const payload = AuthService.verifyJwt(bearerToken);
        const email = payload.sub;
        
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