const { ngoLogin } = require("../controllers/login.js");
const router = require("express").Router();

router.post("/ngoLogin", ngoLogin);

module.exports = router;
