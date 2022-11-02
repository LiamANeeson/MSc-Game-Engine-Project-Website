const path = require("path")
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors")
const port = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/question",require("./routes/questionRoutes"))
app.use("/api/answer",require("./routes/answerRoute"))


// Serve Frontend
if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname, '/client/build')))
 
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname + '/', 'client', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send('Set to Production'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// app.get("*", (req, res) => {
//     let url = path.join(__dirname, '../client/build', 'index.html');
//     if (!url.startsWith('/app/')) // since we're on local windows
//       url = url.substring(1);
//     res.sendFile(url);
//   });