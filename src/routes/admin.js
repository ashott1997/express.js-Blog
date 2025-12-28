const express = require("express")
const router = express.Router()
const upload = require("../config/multer")
const { validatePost } = require("../validators/postValidator")
const adminController = require("../controllers/adminController")

router.get("/", adminController.index)

router.get("/posts/create", adminController.postCreate)

router.post(
  "/posts/store",
  upload.single("thumbnail"),
  validatePost,
  adminController.postStore
)

router.get("/posts/delete/:id", adminController.postDelete)

router.get("/categories/create", adminController.categoriesCreate)

router.post("/categories/store", adminController.categoriesStore)

module.exports = router
