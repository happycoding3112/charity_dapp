const { con } = require("../config/dbConnection.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const sendEmail = require("../utils/sendEmail.js");
const { msg } = require("../email_templates/registration.js");

const registerNGO = (req, res) => {
  const q = "SELECT * FROM ngo WHERE name = (?) ";

  con.query(q, [req.body.name], (err, data) => {
    if (err) return res.status(500).json(err.message);
    if (data?.length) return res.status(409).json("NGO is already registered.");

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO ngo (`name`, `email`, `establishedDate`, `proof`, `annualReport`, `ngoAddress`, `password`) VALUES (?)";

    const values = [
      req.body.name,
      req.body.email,
      req.body.establishedDate,
      req.body.proof,
      req.body.annualReport,
      req.body.ngoAddress,
      hashedPassword,
    ];

    con.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      sendEmail(req.body.email, "Cause✌️Care - NGO Registered", "HELLO!", msg);
      return res.status(200).send({ message: "NGO Registered successfully" });
    });
  });
};

module.exports = { registerNGO };
