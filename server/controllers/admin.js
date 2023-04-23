const { con } = require("../config/dbConnection.js");

const getNGOs = (req, res) => {
  const q = "SELECT * FROM ngo";

  con.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const ngos = data;
    const ngosArray = [];
    ngos.map((ngo) => {
      const { password, ...otherdata } = ngo;
      ngosArray.push(otherdata);
    });

    return res.status(200).json(ngosArray);
  });
};

const approveNGO = (req, res) => {
  const { id } = req.body;

  const q = "UPDATE ngo SET `isVerified` = 'true' WHERE(`id` = ?)";

  con.query(q, [id], (err, data) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Server Error, Please try again later!" });

    return res.status(200).send({ message: "Verified" });
  });
};

const deleteNGO = (req, res) => {
  const { id } = req.body;

  const q = "DELETE FROM ngo WHERE(`id` = ?)";

  con.query(q, [id], (err, data) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Server Error, Please try again later!" });

    return res.status(200).send({ message: "NGO Deleted Successfully" });
  });
};

module.exports = { getNGOs, approveNGO, deleteNGO };
