const ToppingsService = {
    getAllToppings(db){
        return db.select("*").from("toppings");
    },
    getToppingById(db, id){
        return db.select("*").from("toppings").where({id});
    },
    createTopping(db, newTopping){
        return db.insert(newTopping).into("toppings").returning("*").then(([createdTopping]) => createdTopping);
    },
    updateTopping(db, updateTopping){
        return db.update(updateTopping).from("toppings").returning("*").then(([updatedTopping])=> updatedTopping);
    },
    deleteTopping(db, id){
        return db.delete().from("toppings").where({id}).returning("*").then(([deletedTopping])=> deletedTopping);
    }
};

module.exports = ToppingsService;