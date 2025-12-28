require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const session = require("express-session")
const flash = require("connect-flash")

const globalData = require("./src/middleware/globalData")

const indexRouter = require("./src/routes/index")
const adminRouter = require("./src/routes/admin")
const authRouter = require("./src/routes/auth")

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET || "1111111",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dni
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true tylko na HTTPS
    },
  })
)

app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  res.locals.errors = req.flash("error")
  res.locals.success = req.flash("success")
  next()
})

// view engine setup
app.set("views", path.join(__dirname, "src/views"))
app.set("view engine", "twig")
app.set("twig options", {
  cache: false, // ← DODAJ TO!
  autoescape: true,
})
app.use(globalData)
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/", authRouter)
app.use("/admin", adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store")
    next()
  })
}

module.exports = app
