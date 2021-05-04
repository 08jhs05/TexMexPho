// -- GET - /menu
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menu_items;`)
      .then((data) => {
        const menuItems = data.rows;
        db.query(`SELECT * FROM categories;`).then(data2 => {

          const categories = [];
          const menus = {};

          for(const category of data2.rows) {
            categories.push(category.name);
            menus[category.name] = [];
          }
          for(const menuItem of menuItems) {
            menus[categories[menuItem.category_id - 1]].push(menuItem);
          }
          res.render("menu", { menus, categories });
        })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
