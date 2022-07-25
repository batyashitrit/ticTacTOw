const express = require("express");
const router = express.Router();
const multer = require("multer"),
  upload = multer();

const fileLogic = require("./fileLogic");

router.post("/createFile", upload.single("myFile"), async (req, res) => {
  try {
    const { file } = req;
    await fileLogic.CreateFile(file.originalname, file.buffer);
    res.send("file created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/readFolder", async (req, res) => {
  try {
    const folders = await fileLogic.ReadFolder();
    res.send(folders);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/getFile/:fileName", async (req, res) => {
//   try {
//     const fileContent = await fileLogic.ReadFile(req.params.fileName);
//     res.send(fileContent);
//   } catch (err) {
//     res.status(400).json(err || "err");
//   }
// });

// router.put("/updateFile", async (req, res) => {
//   try {
//     await fileLogic.UpdateFile(req.body.fileName, req.body.content);
//     res.send("file updated");
//   } catch (err) {
//     res.status(400).json(err || "err");
//   }
// });

// router.delete("/deleteFile/:fileName", async (req, res) => {
//   try {
//     await fileLogic.RemoveFile(req.params.fileName);
//     res.send("file deleted");
//   } catch (err) {
//     res.status(400).json(err || "err");
//   }
// });

module.exports = router;
