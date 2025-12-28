const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")

router.get("/", indexController.index)

router.get("/post/:slug", indexController.showPost)

router.post("/post/:id/comment-store", indexController.storeComment)

router.get("/category/:id", indexController.showCategory)

router.get("/search", indexController.search)

module.exports = router
