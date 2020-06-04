const Validator = require('validator');
const isEmpty = require("./isempty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "The length of the username must between 2 and 30!";
  }

  if (Validator.isEmpty(data.username)) {
    errors.name = "Username cannot be empty!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty!";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty!";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "The length of the password must between 6 and 30!";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password cannot be empty!";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Please keep confirm password is the same!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}