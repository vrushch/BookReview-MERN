const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;
const bookRouter = require("./routes/books");
const reviewRouter = require("./routes/reviews");
const { connectToDB } = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT,DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", function (req, res) {
  res.send("booksapi");
});

app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
  connectToDB();
});
