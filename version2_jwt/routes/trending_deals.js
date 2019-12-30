const express = require("express");
const router = express.Router();
const chekAuth = require("../middleware/check-auth");

router.post("/", chekAuth, (req, res, next) => {
    console.log("Welcome", req.userData);
    res.status(200).json({
        product: "trending deals page."
    })
})
module.exports = router;