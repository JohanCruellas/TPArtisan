const auth = require("../middleware/auth.js");

module.exports = app => {
    const controller = require("../controllers/material.controller.js");
    var router = require("express").Router();

    router.get("/",[auth.verifyToken], controller.getAll);

    app.use('/material', router);
};