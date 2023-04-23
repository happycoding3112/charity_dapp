const { con } = require("../config/dbConnection.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const registerNGO = (req, res) => {
  const q = "SELECT * FROM ngo WHERE name = (?) ";

  con.query(q, [req.body.name], (err, data) => {
    if (err) return res.status(500).json(err.message);
    if (data?.length) return res.status(409).json("NGO is already registered.");

    console.log("Hello!");

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO ngo (`name`, `email`, `establishedDate`, `proof`, `annualReport`, `description`, `password`) VALUES (?)";

    console.log("User Input", req.body);

    const values = [
      req.body.name,
      req.body.email,
      req.body.establishedDate,
      req.body.proof,
      req.body.annualReport,
      req.body.description,
      hashedPassword,
    ];

    con.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log("Data inserted");
      console.log(data);
      return res.status(200).send({ message: "NGO Registered successfully" });
    });
  });
};

module.exports = { registerNGO };
