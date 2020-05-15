const express = require("express");
const data = require("../data/users.json");

const router = express.Router();

const userHandler = ({ results }) => {
  if (results > data.users.length) {
    const error = new Error("Too many users");
    error.status = 400;
    error.isInternal = true;
    throw error;
  }

  return {
    info: { results: results || data.users.length },
    results: data.users.slice(0, results)
  };
};

router.get("/user", (req, res) => {
  res.json(userHandler(req.query));
});

module.exports = router;
