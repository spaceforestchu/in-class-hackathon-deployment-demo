const db = require("../db/dbConfig");

const getAllReviews = async (bookmarkId) => {
  try {
    const allReviews = await db.any(
      `SELECT * FROM reviews where bookmark_id = $1 ORDER BY id ASC`,
      bookmarkId
    );

    return allReviews;
  } catch (error) {
    return error;
  }
};

const getReviewById = async (bookmarkId, reviewId) => {
  try {
    // const oneReview = await db.any(`SELECT * FROM reviews WHERE id = $1`, id);
    const oneReview = await db.any(
      `
        SELECT BOOKMARK_ID,
            REVIEWER,
            TITLE,
            CONTENT,
            RATING
        FROM BOOKMARKS
        JOIN REVIEWS ON BOOKMARKS.ID = REVIEWS.BOOKMARK_ID
        WHERE BOOKMARKS.ID = $1
            AND REVIEWS.ID = $2;
    `,
      [bookmarkId, reviewId]
    );

    return oneReview;
  } catch (error) {
    return error;
  }
};

const deleteReviewById = async (id) => {
  try {
    const deleteReview = await db.any(
      `DELETE FROM reviews WHERE id = $1 RETURNING *`,
      id
    );

    return deleteReview;
  } catch (error) {
    return error;
  }
};

const createReview = async (review) => {
  try {
    const newReview = await db.any(
      `INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        review.bookmark_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
      ]
    );

    return newReview;
  } catch (error) {
    return error;
  }
};

const updateReviewById = async (id, review) => {
  let { reviewer, title, content, rating } = review;
  try {
    const updatedReview = await db.any(
      `UPDATE reviews SET reviewer = $1, title = $2, content = $3, rating = $4 WHERE id = $5 RETURNING *`,
      [reviewer, title, content, rating, id]
    );

    return updatedReview;
  } catch (error) {
    return error;
  }
};

const getAllReviewsOnBookmarkId = async (bookmark_id) => {
  try {
    // const allReviews = await db.any(
    //   `SELECT * FROM reviews WHERE bookmark_id = $1 RETURNING *`,
    //   bookmark_id
    // );

    const allReviews = await db.any(
      `SELECT * FROM bookmarks INNER JOIN reviews ON reviews.bookmark_id = bookmarks.id WHERE reviews.bookmark_id = $1 `,
      bookmark_id
    );

    // `SELECT * FROM reviews WHERE exists (select * from bookmarks WHERE $1 = reviews.bookmark_id)`

    return allReviews;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  deleteReviewById,
  createReview,
  updateReviewById,
  getAllReviewsOnBookmarkId,
};
