const axios = require("axios");
const {
  debitFromAccountUrl,
  INTERNAL_API_TOKEN,
  reverseTransactionUrl,
  telebirrAgentId,
  telebirrAgentPassword,
  telebirrGenerateTokenUrl,
  telebirrAccountInfoUrl,
} = require("../../configs/config");

let TelebirrAccessToken;
const { ResponseMessage } = require("../../constants/constants");

class TelebirrService {
  static async accountInfo(accountNumber) {
    try {
      const body = {
        accountNumber,
        amount,
      };
      const headers = {
        agentId: telebirrAgentId,
        password: telebirrAgentPassword,
        token: TelebirrAccessToken,
      };
      let result = {
        status: false,
        message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
        accountNumber: "",
        name: "",
      };
      let errorData;
      const response = await axios
        .post(`${telebirrAccountInfoUrl}`, body, headers)
        .then((res) => res.data)
        .catch((err) => {
          errorData = err.response;
          //do sth
        });
      if (!errorData && response && response.status == "Success") {
        //do
        result = {
          status: true,
          accountNumber: accountNumber,
          name: response.name || "",
          message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
        };
      }
      if (errorData) {
        result = {
          status: false,
          message: errorData.message,
        };
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async fundTransfer(params) {
    try {
      const body = {
        accountNumber: params.accountNumber,
        amount: params.amount,
        transactionId: params.transactionId,
      };
      const headers = {
        agentId: telebirrAgentId,
        password: telebirrAgentPassword,
        token: TelebirrAccessToken,
      };
      let result = {
        status: false,
        message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
      };
      let errorData;
      const response = await axios
        .post(`${telebirrFundTransferUrl}`, body, headers)
        .then((res) => res.data)
        .catch((err) => {
          errorData = err.response;
          //do sth
        });
      if (!errorData && response && response.status == "Success") {
        //do
        result = {
          status: true,
          message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
        };
      }
      if (errorData) {
        result = {
          status: false,
          message: errorData.message,
        };
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async generateToken() {
    try {
      const body = {
        agentId: telebirrAgentId,
        password: telebirrAgentPassword,
      };
      const headers = {
        agentId: telebirrAgentId,
        password: telebirrAgentPassword,
      };
      let result = {
        status: false,
        message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
      };
      let errorData;
      const response = await axios
        .post(`${telebirrGenerateTokenUrl}`, body, headers)
        .then((res) => res.data)
        .catch((err) => {
          errorData = err.response;
          //do sth
        });
      if (!errorData && response && response.status == "Success") {
        //do
        TelebirrAccessToken = response.token;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  TelebirrService,
};
