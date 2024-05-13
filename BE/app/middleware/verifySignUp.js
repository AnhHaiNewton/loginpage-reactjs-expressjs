const db = require("../models");
const User = db.user;

checkDuplicateUsername = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({
      message: "Failed! Password and Confirm Password do not match!",
    });
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkConfirmPassword,
};

module.exports = verifySignUp;
