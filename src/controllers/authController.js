const db = require("../config/database")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  res.render("auth/register")
}

const registerStore = async (req, res) => {}

module.exports = {
  register,
  registerStore,
}
