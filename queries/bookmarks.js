const db = require("../db/dbConfig");

const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");

    return allBookmarks;
  } catch (error) {
    return error;
  }
};

const bookmarkById = async (id) => {
  try {
    const bookmark = await db.any(`SELECT * FROM bookmarks WHERE id = $1`, id);

    return bookmark;
  } catch (error) {
    return error;
  }
};

const createBookmark = async (data) => {
  try {
    const newBookmark = await db.one(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.name, data.url, data.category, data.is_favorite]
    );

    return newBookmark;
  } catch (e) {
    return e;
  }
};

const deleteBookmark = async (id) => {
  try {
    // const deletedBookmark = await db.any(
    //   `DELETE FROM bookmarks WHERE id = ${id} RETURNING *`
    // );

    const deletedBookmark = await db.any(
      `DELETE FROM bookmarks WHERE id = $1 RETURNING *`,
      id
    );

    return deletedBookmark;
  } catch (e) {
    return e;
  }
};

const updateBookmarkById = async (id, bookmark) => {
  try {
    const updatedBookmark = await db.any(
      "UPDATE Bookmarks set name = $1, url = $2, category = $3, is_favorite = $4 WHERE id = $5 RETURNING *",
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
    );

    console.log(updatedBookmark);
    return updatedBookmark;
  } catch (error) {
    return error;
  }
};

// const updateBookmarkById = async (id, bookmark) => {
//   try {
//     let dynamicValues = Object.values(bookmark);

//     function makeQueryString(data) {
//       let count = 2;
//       let result = "";

//       for (let key in data) {
//         result += `${key} = $${count},`;
//         count++;
//       }
//       result = result.substring(0, result.length - 1);
//       return result;
//     }

//     let queryString = makeQueryString(bookmark);

//     let finalQueryString = `UPDATE bookmarks SET ${queryString} WHERE id = $1 RETURNING *`;

//     const updatedBookmark = await db.any(finalQueryString, [
//       id,
//       ...dynamicValues,
//     ]);
//     return updatedBookmark;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  getAllBookmarks,
  bookmarkById,
  createBookmark,
  deleteBookmark,
  updateBookmarkById,
};
