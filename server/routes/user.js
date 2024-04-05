const express = require("express");
const router = express.Router();
const controlloer = require("../controller/Cmain");

// GET /api-serever/user
router.get("/",controlloer.getUser);

module.exports = router;