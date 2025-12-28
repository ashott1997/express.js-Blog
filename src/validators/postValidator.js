const { body, validationResult } = require("express-validator")
const { default: slugify } = require("slugify")

const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("body").notEmpty().withMessage("Body is required"),
  (req, res, next) => {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
        locale: "pl",
      })
    }

    next()
  },

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).render("admin/posts/create", {
        errors: errors.array(),
        old: req.body,
      })
    }

    next()
  },
]

module.exports = { validatePost }
