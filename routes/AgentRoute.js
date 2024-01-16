const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const accountData = [
  {
    accountNumber: 911223344,
    timestamp: new Date(),
    amount: 1000,
    name: "Abebe kebede",
    message: "Account information retrieved successfully",
    status: "Success",
  },
  {
    accountNumber: 922334455,
    timestamp: new Date(),
    amount: 1500,
    name: "Kebede bekele",
    message: "Account information retrieved successfully",
    status: "Success",
  },
];
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
    if (accountNumber.toString().length < 9) {
      return res
        .status(400)
        .send({ error: "Account number must be at least 9 digit long." });
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

    // Validate accountNumber is a number
    if (isNaN(accountNumber)) {
      return res.status(400).json({ error: "Account number must be a number" });
    }

    // Find the account data based on accountNumber
    const accountInfo = accountData.find(
      (account) => account.accountNumber === parseInt(accountNumber)
    );

    if (!accountInfo || !amount) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Mock payment logic
    const referenceId = Date.now(); // This is just a mock referenceId
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
module.exports = router;
