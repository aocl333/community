const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 5000;

//mongodb+srv://yoondahyun:qwer1234!!@cluster0.qcmdzxy.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./Router/post.js"));
app.use("/api/user", require("./Router/user.js"));
app.use("/api/reple", require("./Router/reple.js"));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://yoondahyun:qwer1234!!@cluster0.qcmdzxy.mongodb.net/Community?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connecting MongoDb...");
    })
    .catch((err) => console.log(`${err}`));
});

app.get("/", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});
