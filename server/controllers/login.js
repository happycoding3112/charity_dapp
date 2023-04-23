const { con } = require("../config/dbConnection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ngoLogin = (req, res) => {
  const q = "SELECT * FROM ngo WHERE(`email` = ?)";

  con.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(400).send({ message: "NGO must be registered first" });
    }

    const validatePassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!validatePassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (validatePassword) {
      if (data[0].isVerified === "false")
        return res.status(405).send({
          message: "NGO is being verified. Please wait for acceptance mail",
        });

      if (data[0].isVerified === "true") {
        const token = jwt.sign();
      }
    }
  });
};

module.exports = { ngoLogin };
