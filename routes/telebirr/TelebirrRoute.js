const express = require("express");
const {
  TelebirrAccountInfoHandler,
} = require("../../controllers/handlers/TelebirrController");
const router = express.Router();

router.get("/getCustomerInfo", TelebirrAccountInfoHandler);
router.post("/fundTransfer", TelebirrAccountInfoHandler);
