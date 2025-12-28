const db = require("../config/database")

const index = async (req, res) => {
  const [posts] = await db.query(
    "SELECT * FROM posts ORDER BY id DESC limit 20"
  )
  res.render("pages/home", { posts: posts })
}

const showPost = async (req, res) => {
  const [posts] = await db.query("SELECT * FROM posts WHERE slug = ?", [
    req.params.slug,
  ])

  const post = posts[0]

  if (!posts || posts.length === 0) {
    return res
      .status(404)
      .send(`Post o slug "${req.params.slug}" nie został znaleziony`)
  }
  const [comments] = await db.query(
    "SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC",
    [post.id]
  )

  res.render("pages/post", { post: post, comments: comments })
}

const storeComment = async (req, res) => {
  try {
    const id = req.params.id
    const { author, body } = req.body
    await db.query(
      "INSERT INTO comments (post_id, author, body) VALUES (?,?,?)",
      [id, author, body]
    )

    const [slug] = await db.query("SELECT slug FROM posts WHERE id = ?", [id])
    res.redirect("/post/" + slug[0].slug)
  } catch (err) {
    console.error("ERROR:", err)
    res.status(500).send("Błąd: " + err.message)
  }
}

const search = async (req, res) => {
  const [posts] = await db.query("SELECT * FROM posts WHERE title LIKE ?", [
    "%" + req.query.s + "%",
  ])

  console.log("search param" + req.query.s)

  res.render("pages/home", { posts: posts })
}

const showCategory = async (req, res) => {
  try {
    const [posts] = await db.query(
      "SELECT * FROM posts WHERE category_id = ?",
      [req.params.id]
    )
    res.render("pages/home", { posts: posts })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  index,
  showPost,
  storeComment,
  search,
  showCategory,
}
