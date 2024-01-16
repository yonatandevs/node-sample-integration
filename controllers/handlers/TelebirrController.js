const { StatusCode, ResponseMessage } = require("../../constants/constants");
const {
  TelebirrService,
} = require("../../services/telebirr/InternalAPISerivice");

const TelebirrAccountInfoHandler = async (req, res) => {
  //path variable->query parames
  //joi - schema validator
  //   schema: {
  //     accountNumber.numeber.min(9).max(13);
  //   }
  const accountNumber = req.params;
  try {
    if (
      accountNumber &&
      isNaN(accountNumber) &&
      typeof accountNumber == "number"
    ) {
      const result = await TelebirrService.accountInfo(accountNumber);
      const statusCode = result.status ? StatusCode.SUCCESS : StatusCode.FAILED;

      return res.status(statusCode).send({
        ...result,
      });
    } else {
      return res.status(StatusCode.FAILED).send({
        message: ResponseMessage.INVALID_ACCOUNT_NUMBER,
      });
    }
  } catch (err) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
const TelebirrFundTransferHandler = async (req, res) => {
  //path variable->query parames
  //joi - schema validator
  //   schema: {
  //     accountNumber.numeber.min(9).max(13);
  //   }
  const accountNumber = req.params;
  try {
    if (
      accountNumber &&
      isNaN(accountNumber) &&
      typeof accountNumber == "number"
    ) {
      const result = await TelebirrService.accountInfo(accountNumber);
      const statusCode = result.status ? StatusCode.SUCCESS : StatusCode.FAILED;

      return res.status(statusCode).send({
        ...result,
      });
    } else {
      return res.status(StatusCode.FAILED).send({
        message: ResponseMessage.INVALID_ACCOUNT_NUMBER,
      });
    }
  } catch (err) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  TelebirrAccountInfoHandler,
};
