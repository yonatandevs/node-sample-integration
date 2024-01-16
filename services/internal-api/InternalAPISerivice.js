const axios = require("axios");
const {
  debitFromAccountUrl,
  INTERNAL_API_TOKEN,
  reverseTransactionUrl,
} = require("../../configs/config");
const { ResponseMessage } = require("../../constants/constants");

class InternalAPIService {
  static async debitFromAccount(accountNumber, amount, telebirrAccountId) {
    try {
      const body = {
        accountNumber,
        amount,
        telebirrAccountId,
      };
      const headers = {
        Authorization: `Bearer ${INTERNAL_API_TOKEN}`,
      };
      let result = {
        status: false,
        message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
      };
      let errorData;
      const response = await axios
        .post(`${debitFromAccountUrl}`, body, headers)
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
  static async reverseTransaction(transactionId) {
    try {
      const body = {
        referenceId: transactionId,
      };
      const headers = {
        Authorization: `Bearer ${INTERNAL_API_TOKEN}`,
      };
      let result = {
        status: false,
        message: ResponseMessage.DEBIT_FROM_ACCOUNT_SUCCESS,
      };
      let errorData;
      const response = await axios
        .post(`${reverseTransactionUrl}`, body, headers)
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
}

module.exports = {
  InternalAPIService,
};
