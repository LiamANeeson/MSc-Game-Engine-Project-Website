const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors")
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
connectDB()


app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/question", require("./routes/questionRoutes"))
app.use("/api/answer", require("./routes/answerRoute"))

__dirname = path.resolve();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
else {
  app.get("/", (req, res) => {
    console.log("This is development mode")
    res.send("APIs Up && running");
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(errorHandler);

module.exports = app;
