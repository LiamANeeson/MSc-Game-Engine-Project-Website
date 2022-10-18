const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors")
const port = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.send("APIs Up && running");
});
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/question", require("./routes/questionRoutes"))
app.use("/api/answer", require("./routes/answerRoute"))


app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(errorHandler);