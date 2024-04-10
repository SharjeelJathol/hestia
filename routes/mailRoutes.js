const express = require("express");
const mail = express.Router();
const payment = require("../controllers/payment");
const mailController = require("../controllers/mailController");

mail.post("/check-mail-account", mailController.check_mail_account);
mail.post("/create-mail-account", mailController.create_mail_account);

module.exports = mail;
