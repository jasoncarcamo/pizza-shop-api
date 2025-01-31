const OrderService = {
    getAllOrders(db){
        return db.select("*").from("orders");
    },
    getAllCustomerOrders(db, customer_id){
        return db.select("*").from("orders").where({customer_id});
    },
    getOrdersByMobileNumber(db, mobile_number){
        return db.select("*").from("orders").where({customer_mobile_number: mobile_number}).returning("*").then(([orders]) => orders);
    },
    getOrderById(db, id){
        return db.select("*").from("orders").where({id}).first();
    },
    createOrder(db, newOrder){
        return db.insert(newOrder).into("orders").returning("*").then(([createdOrder]) => createdOrder);
    },
    updateOrder(db, updateOrder, id){
        return db.update(updateOrder).from("orders").returning("*").then(([updatedOrder]) => updatedOrder);
    },
    deleteOrder(db, id){
        return db.delete().from("orders").where({id}).returning("*").then(([deletedOrder]) => deletedOrder);
    }
};

module.exports = OrderService;