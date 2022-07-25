const fs = require("fs");
console.log("start write to file");

// function isExist(folderName) {
//   try {
//     fs.access(folderName, (err) => {
//       if (err) throw err;
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

function CreateFolder(folderName) {
  try {
    if (!fs.existsSync(folderName))
      fs.mkdirSync(`./Root/${folderName}`, (err) => {
        if (err) throw err;
      });
  } catch (err) {
    console.log(err);
  }
}
console.log("end write to file");

module.exports = {
  // isExist,
  CreateFolder,
};
