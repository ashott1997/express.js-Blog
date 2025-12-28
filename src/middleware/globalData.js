const db = require("../config/database")

const globalData = async (req, res, next) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories")
    res.locals.sideBarCategories = categories
    next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = globalData
