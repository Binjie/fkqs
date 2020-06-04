const Validator = require('validator');
const isEmpty = require("./isempty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.password = "Username cannot be empty!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}