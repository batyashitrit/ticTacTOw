const fs = require("fs");
console.log("start write to file");

function CreateFile(filePath, content) {
  try {
    // RightTabs(fileName) && RightEnding(fileName) && IsExist(fileName) == false;
    fs.writeFileSync(`./Root/${filePath}`, content);
  } catch (err) {
    console.log(err);
  }
}

function ReadFolder() {
  return fs.readdirSync("Root");
  console.log(filenames);
}

// function ReadFile(fileName) {
//   return fs.readFileSync(fileName);
// }

// function UpdateFile(fileName, content) {
//   fs.appendFileSync(fileName, content);
// }

// function RemoveFile(fileName) {
//   fs.rmSync(fileName);
// }
// ///מכאן לתקן לפי מה שאביעד שלח בווצאפ
// /////
// function isExist(filename) {
//   return fs.existsSync("./data/" + filename);
// }
// function isValidName(filename = "") {
//   return ["/", "\\", "*", ":", "|", "?", "<", ">", '"'].find((char) =>
//     filename.includes(char)
//   )
//     ? false
//     : true;
// }
// function isValidExtantions(filename = "") {
//   let ext = filename.slice(filename.lastIndexOf("."));
//   return ["pdf", "txt", "png", "jpg", "js", "html", "css", "jsx", "ts"].find(
//     (char) => ext == char
//   )
//     ? true
//     : false;
// }

/////
// function IsExist(fileName) {
//   fs.existsSync(fileName);
// }

// function RightTabs(fileName) {
//   let wrongTabs = ["/", ":", "*", "?", '"', "<", ">", "="];
//   return wrongTabs.find(fileName) ? false : true;
// }

// function RightEnding(fileName) {
//   if (
//     fileName.slice(fileName.lastIndexOf(".")) == "pdf" ||
//     fileName.slice(fileName.lastIndexOf(".")) == "jpg"
//   ) {
//     return true;
//   }
// }

// CreateFile("hlkjh.pdf", "hallow");

module.exports = {
  CreateFile,
  ReadFolder,
  // , ReadFile, UpdateFile, RemoveFile
};
