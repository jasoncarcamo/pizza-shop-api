const CustomerService = {
    getCustomerByEmail(db, email){
        return db.select("*").from("customers").where({email}).first();
    },
    createCustomer(db, newCustomer){
        return db.insert(newCustomer).into("customers").returning("*").then(([createdCustomer]) => createdCustomer);
    },
    updateCustomer(db, updatedCustomer, id){
        return db.update(updatedCustomer).from("customers").where({id}).returning("*").then(([updatedCustomer]) => updatedCustomer);
    },
    deleteCustomer(db, id){
        return db.delete().from("customers");
    }
};

module.exports = CustomerService;