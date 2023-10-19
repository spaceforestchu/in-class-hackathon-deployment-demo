const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const https = require("https");

const bookmarkController = require("./controllers/bookmarkController");
const reviewsController = require("./controllers/reviewsController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/bookmarks", bookmarkController);
// app.use("/reviews", reviewsController);

app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

// cron.schedule("1 * * * * *", () => {
//   console.log("HELLO 9.5 and 9.6 ");
// });

if (process.env.NODE_ENV === "production") {
  cron.schedule("1 * * * * *", () => {
    console.log("----");

    https
      .get(
        "https://deployment-review-hackathon-bookmark.onrender.com/bookmarks",
        (resp) => {
          let data = "";

          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            console.log(JSON.parse(data));
            // console.log(JSON.parse(data).explanation);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });
}

module.exports = app;
