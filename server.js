const path = require("path")
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cloudinary = require("./cloudinary.js");
const uploadFileData = require("./models/files_data");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors")
const app = express();
const multer = require("multer");
const port = process.env.PORT || 5000;
connectDB()

const upload =multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
  });

  app.use(cors())

  app.post('/upload', upload.single('file'), async function (req, res) {
    //console.log(req.file)Games
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    const uploadfileData = new uploadFileData({
        description:req.body.description,
          files:upload.secure_url,
          name:req.body.name,
          size:req.body.size,
          username:req.body.username,
          tag:req.body.tag
        });
        await uploadfileData.save();
        res.json({ uploadfileData });
        return res.json({
          success: true,
          file: upload.secure_url,          
        }); 
  })

  app.get('/download', (req, res) => {

    const zip = new AdmZip();

    for(var i = 0; i < uploadDir.length;i++){
        zip.addLocalFile(__dirname+"/Upload/"+uploadDir[i]);
    }

    let folder = 'HorizonGE';

    // Define zip file name
    const downloadName = `${folder}.zip`;

    const data = zip.toBuffer();
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data);

})

app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/question", require("./routes/questionRoutes"))
app.use("/api/answer", require("./routes/answerRoute"))

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

app.use(errorHandler);
module.exports = app;
