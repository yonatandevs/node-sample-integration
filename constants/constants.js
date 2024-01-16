const ResponseMessage = {
  DEBIT_FROM_ACCOUNT_SUCCESS: "Debited successfully.",
  DEBIT_FROM_ACCOUNT_FAILED: "Failed to debit from account.",
  INVALID_ACCOUNT_NUMBER: "Invalid account number",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again.",
};
const StatusCode = {
  UN_AUTHORIZED: 401,
  SUCCESS: 200,
  FAILED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
  ResponseMessage,
  StatusCode,
};
