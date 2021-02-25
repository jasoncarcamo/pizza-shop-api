const MenuItemsService = {
    getAllMenuItems(db){
        return db.select("*").from("menu_items");
    },
    getMenuItemByCategory(db, category){
        return db.select("*").from("menu_items").where({category});
    },
    getMenuItemById(db, id){
        return db.select("*").from("menu_items").where({id}).first();
    },
    createMenuItem(db, newMenuItem){
        return db.insert(newMenuItem).into("menu_items").returning("*").then(([createdMenuItem]) => createdMenuItem);
    },
    updateMenuItem(db, updateMenuItem, id){
        return db.update(updateMenuItem).from("menu_items").where({id}).returning("*").then(([updatedMenuItem]) => updatedMenuItem);
    },
    deleteMenuItem(db, id){
        return db.delete().from("menu_items").where({id});
    }
};

module.exports = MenuItemsService;