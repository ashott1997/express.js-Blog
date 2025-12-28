const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get("/registration", authController.register)
router.post("/registration", authController.registerStore)

module.exports = router
