const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://rubbalscorner:UBcgKBZDfmtolVLs@rubbals.ymdsi9q.mongodb.net/rubbals"
  );
  console.log("Connection Made");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//getting routes

// const postRoute = require("./routes/postRoutes");
const getRoute = require("./routes/getRoutes");
// app.use(postRoute);
app.use(getRoute);

app.listen(8000, () => {
  console.log("Running");
});
