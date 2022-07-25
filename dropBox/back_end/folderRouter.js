const express = require("express");
const router = express.Router();
const multer = require("multer"),
  upload = multer();

const folderLogic = require("./folderLogic");

router.post("/createFolder", upload.single("myFolder"), async (req, res) => {
  try {
    // const { file } = req;
    // console.log("********", req.);
    await folderLogic.CreateFolder(req.body.myFolder);
    res.send("success");
  } catch (err) {
    console.log(err || "err");
    res.status(400).json(err || "err");
  }
});
module.exports = router;
