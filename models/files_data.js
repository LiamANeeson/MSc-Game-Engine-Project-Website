const mongoose = require("mongoose");
const userFileData = new mongoose.Schema(
    {
      description: {
        type: String,
      },
      files: {
          type: String,
        },
      name: {
        type: String,
      },
      size: {
        type: String
      },
      username: {
        type: String,
      },
      tag: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("userFileData", userFileData);