const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) throw new Error("Name Invalid!");
  else if (!validator.isEmail(emailId)) throw new Error("Email Invalid!");
  else if (!validator.isStrongPassword(password))
    throw new Error("Password Invalid!");
};

module.exports = { validateSignUpData };
