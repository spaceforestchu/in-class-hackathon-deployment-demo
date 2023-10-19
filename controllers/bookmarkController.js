const express = require("express");
const router = express.Router();

const reviewsController = require("./reviewsController");

router.use("/:bookmarkId/reviews", reviewsController);

const {
  getAllBookmarks,
  bookmarkById,
  createBookmark,
  deleteBookmark,
  updateBookmarkById,
} = require("../queries/bookmarks");

const {
  checkName,
  checkBoolean,
  validateURL,
} = require("../validations/checkBookmarks");

router.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();

  if (Array.isArray(allBookmarks)) {
    res.json(allBookmarks);
  } else {
    res.status(500).json({ error: "Server error" });
  }

  //check allBookmarks is it an array

  // if (allBookmarks[0]) {
  //   res.json(allBookmarks);
  // } else {
  //   res.status(500).json({ error: "Server error" });
  // }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const bookmark = await bookmarkById(id);

  if (bookmark.length === 0) {
    res.status(404).json({ error: "not found" });
  } else {
    res.json(bookmark[0]);
  }
});

router.post("/", checkName, checkBoolean, async (req, res) => {
  const createdBookmark = await createBookmark(req.body);
  console.log(createBookmark);
  res.json(createdBookmark);
});

router.delete("/:id", async (req, res) => {
  const deletedBookmark = await deleteBookmark(req.params.id);

  if (deletedBookmark.length === 0) {
    return res.status(404).json({ message: "No data found!", error: true });
  } else {
    return res.json(deletedBookmark[0]);
  }
});

//create a put request that updates a bookmark
// /:id
router.put("/:id", checkName, checkBoolean, validateURL, async (req, res) => {
  const updatedBookmark = await updateBookmarkById(req.params.id, req.body);
  console.log(updatedBookmark);
  if (updatedBookmark.length === 0) {
    res.status(404).json({ message: "not found!", error: true });
  } else {
    res.json(updatedBookmark[0]);
  }
});

module.exports = router;
