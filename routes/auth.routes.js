// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { commonLogin } = require("../controllers/common/auth.controllers");

router.post("/signin", commonLogin);

module.exports = router;
