const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const accountData = [
  {
    accountNumber: 9900000000123,
    timestamp: new Date(),
    amount: 1000,
    name: "Abebe kebede",
    message: "Account information retrieved successfully",
    status: "Success",
  },
  {
    accountNumber: 9900000000234,
    timestamp: new Date(),
    amount: 1500,
    name: "Kebede bekele",
    message: "Account information retrieved successfully",
    status: "Success",
  },
  // Add more mock data as needed
];
const ReferenceNumber = [];
const agents = [
  {
    agentId: "amharabank_test_002345",
    token: "token1",
    password: "#&*^#*GFDVVFVF&#^#&*#&*",
  },
  {
    agentId: "amhara_bank_test2_002345",
    token: "token2",
    password: "HDH#^^%^#%#%&%#DDVDV",
  },
];
router.post("/generateToken", (req, res) => {
  try {
    const { agentId, password } = req.body;
    const validAgent = agents.find(
      (agent) => agent.agentId === agentId && agent.password === password
    );

    if (!validAgent) {
      return res.status(401).json({ error: "Invalid agent credentials" });
    }

    // Generate JWT token with a 3-minute expiration
    const token = jwt.sign({ agentId }, process.env.JWT_SECRET, {
      expiresIn: "3m",
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server  error." });
  }
});
router.get("/account/:accountNumber", (req, res) => {
  try {
    const { accountNumber } = req.params;

    if (isNaN(accountNumber)) {
      return res.status(400).send({ error: "Account number must be a number" });
    }
    if (accountNumber.toString().length !== 13) {
      return res
        .status(400)
        .send({ error: "Account number must be  13 digit long." });
    }

    const accountInfo = accountData.find(
      (account) => account.accountNumber === parseInt(accountNumber)
    );

    if (!accountInfo) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(accountInfo);
  } catch (err) {
    return res.status(500).json({ error: "internal server  error." });
  }
});
router.post("/pay", (req, res) => {
  try {
    const { accountNumber, amount, name, timestamp } = req.body;

    if (isNaN(accountNumber)) {
      return res.status(400).json({ error: "Account number must be a number" });
    }

    const accountInfo = accountData.find(
      (account) => account.accountNumber === parseInt(accountNumber)
    );

    if (!accountInfo || !amount) {
      return res.status(404).json({ error: "Account not found" });
    }

    const referenceId = Date.now();
    const amountPaid = amount;
    return res.status(200).json({
      accountNumber: accountNumber,
      amountPaid,
      status: "Success",
      message: "Payment successful",
      referenceId,
    });
  } catch (err) {
    return res.status(500).json({ error: "internal server  error." });
  }
});
router.post("/debitFromAccount", (req, res) => {
  try {
    const { accountNumber, amount, telebirrAccountId } = req.body;

    if (isNaN(accountNumber)) {
      return res.status(400).json({ error: "Account number must be a number" });
    }

    const accountInfo = accountData.find(
      (account) => account.accountNumber === parseInt(accountNumber)
    );

    if (!accountInfo || !amount || !telebirrAccountId) {
      return res.status(404).json({ error: "Missing require fields." });
    }

    const referenceId = Date.now();
    const amountPaid = amount;
    ReferenceNumber.push(referenceId);
    return res.status(200).json({
      accountNumber: accountNumber,
      amountPaid,
      status: "Success",
      message: "Payment successful",
      referenceId,
    });
  } catch (err) {
    return res.status(500).json({ error: "internal server  error." });
  }
});
router.post("/reverseTransaction", (req, res) => {
  try {
    const { referenceId } = req.body;

    if (isNaN(referenceId)) {
      return res.status(400).json({ error: "Reference num must be a number" });
    }

    if (!ReferenceNumber.includes(referenceId)) {
      return res.status(404).json({ error: "Reference Id doesn't exist" });
    }

    return res.status(200).json({
      status: "Success",
      message: "Reversed successful",
      referenceId,
    });
  } catch (err) {
    return res.status(500).json({ error: "internal server  error." });
  }
});
module.exports = router;
