const upload = require("../middleware/fileUploadMiddleware");

const uploadFiles = async (req, res) => {

   

    try {
        await upload(req, res);
        if (req.file == undefined) {
            return res.status(200).send();
        }
        return res.status(200).send({
            message: "File uploaded successfully",
            fileName: req.file.filename
        });
    } catch (error) {
        console.log(error);
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot exceed 10MB",
            });
        }
        return res.status(500).send({
            message: "Unable to upload files:, ${error}"
        });
    }
};

module.exports = {
    uploadFiles,
};