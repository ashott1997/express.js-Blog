const db = require("../config/database")

const index = async (req, res) => {
  const [posts] = await db.query(
    "SELECT * FROM posts ORDER BY id DESC limit 20"
  )

  const [categories] = await db.query("SELECT * FROM categories")

  res.render("admin/index", { posts: posts, categories: categories })
}

const postCreate = async (req, res) => {
  const [categories] = await db.query("SELECT * FROM categories")

  res.render("admin/posts/create", { categories: categories })
}

const postStore = async (req, res) => {
  try {
    const { title, body, slug, category } = req.body

    const thumbnail = req.file ? "/uploads/" + req.file.filename : null

    await db.query(
      "INSERT INTO posts (title, body, thumbnail, slug, category_id) VALUES (?,?,?,?,?)",
      [title, body, thumbnail, slug, category]
    )
    res.redirect("/admin")
  } catch (err) {
    res.send(err)
  }
}

const postDelete = async (req, res) => {
  const { id } = req.params
  await db.query("DELETE FROM posts WHERE id = ?", [id])
  res.redirect("/")
}

const categoriesCreate = async (req, res) => {
  res.render("admin/categories/create")
}

const categoriesStore = async (req, res) => {
  const { name } = req.body
  await db.query("INSERT INTO categories (name) VALUES (?)", [name])
  res.redirect("/admin")
}

module.exports = {
  index,
  postCreate,
  postStore,
  postDelete,
  categoriesCreate,
  categoriesStore,
}
