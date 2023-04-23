const { registerNGO } = require("../controllers/register.js");
const router = require("express").Router();

router.post("", registerNGO);

module.exports = router;
