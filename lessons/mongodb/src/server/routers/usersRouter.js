const express = require("express");
const data = require("../data/users.json");
const { AddUser, GetAllUsers, FindUser } = require("../service/userService");

const router = express.Router();

/* 
  We need to add this to propagate errors correctly within
  async handlers 😀
*/
const asyncHandler = (func) => (req, res, next) => func(req, res).catch(next);

router.get("/user", asyncHandler(GetAllUsers));
router.get("/user/:id", asyncHandler(FindUser));
router.post("/user", asyncHandler(AddUser));

module.exports = router;
