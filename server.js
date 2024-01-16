// Import dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AgentRoute = require("./routes/AgentRoute");
const ABaRoute = require("./routes/ABaRoute");
const jwt = require("jsonwebtoken");
dotenv.config({
  path: "./configs/config.env",
});
const app = express();
app.use(express.json());
const port = process.env.PORT || 5050;

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

app.use((req, res, next) => {
  try {
    const { agentid, token, password } = req.headers;
    console.log(req.url, req.body);
    if (req.url == "/API/v1.0.0/agent/generateToken") {
      if (!agentid || !password) {
        console.log("missing....", req.headers);
        return res
          .status(401)
          .json({ error: "Unauthorized - Missing credentials" });
      }
      const validAgent = agents.find(
        (agent) => agent.agentId === agentid && agent.password === password
      );
      if (!validAgent) {
        return res.status(401).json({ error: "Invalid agent credentials" });
      }
      console.log("success");
      next();
    } else if (req.url.toString().includes("/API/v1.0.0/ABa")) {
      console.log("Debit from account");
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
      const token = authHeader.toString().split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_INTERNAL, (err, decoded) => {
        if (err) {
          console.log(err);
          return res
            .status(401)
            .json({ error: "Unauthorized - Invalid token" });
        }
        next();
      });
    } else {
      if (!agentid || !token || !password) {
        return res
          .status(401)
          .json({ error: "Unauthorized - Missing credentials" });
      }
      const validAgent = agents.find(
        (agent) => agent.agentId === agentid && agent.password === password
      );

      if (!validAgent) {
        return res.status(401).json({ error: "Invalid agent credentials" });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "Unauthorized - Invalid token" });
        }
        req.agentId = decoded.agentId;
        next();
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server  error." });
  }
});
app.use(express.json());
app.use("/API/v1.0.0/agent", AgentRoute);
app.use("/API/v1.0.0/ABa", ABaRoute);
//exporting routes
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async (err) => {
    if (err) {
      throw err;
    } else {
      console.log("successfully connected to DB");
      const token = jwt.sign(
        { internalAPIKey: "internalAPIKey" },
        process.env.JWT_SECRET_INTERNAL
      );
      console.log(token);
    }
  }
);
//setting Routes End points

const server = app.listen(port, () =>
  console.log(`Backend server port: ${port}`)
);
