const { Router } = require("express");
const { addData, getBalance } = require("./api.controller");
const multer = require("multer");

const router = Router();

//* Route to handle file uploads for adding data
router.post("/addData", multer().single("file"), addData);
//* Route to get asset balance data
router.get("/getBalance", getBalance);

module.exports = router;
