const { getNGOs, approveNGO, deleteNGO } = require("../controllers/admin.js");
const router = require("express").Router();

router.get("/getNgos", getNGOs);
router.put("/approveNgo", approveNGO);
router.post("/rejectNgo", deleteNGO);

module.exports = router;
