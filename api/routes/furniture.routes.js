const auth = require("../middleware/auth.js");

module.exports = app => {
    const controller = require("../controllers/furniture.controller.js");
    var router = require("express").Router();

    router.get("/", [auth.verifyToken], controller.getAll);
    router.post("/", [auth.verifyToken], controller.create);
    router.put("/:id", [auth.verifyToken], controller.update);

    app.use('/furniture', router);
};