import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Root() {
  const [isClickedFolder, setIsClickedFolder] = useState(false); //flag variable to open and close folder's input
  const [isClickedFile, setIsClickedFile] = useState(false); //flag variable to open and close file's input
  const [folder, setFolder] = useState(); //state to hold new folder's name
  const [file, setFile] = useState(); //state to hold new file's name
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const folderSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myFolder", folder);
    axios.post("http://localhost:3700/folders/createFolder", formData);
    setFolders((folders) => [...folders, e.target[0].value]);
    // console.log(e.target[0].value);
    setIsClickedFolder(false);
  };

  const fileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myFile", file);
    axios.post("http://localhost:3700/files/createFile", formData);
    setFiles((files) => [...files, e.target[0].value]);
    setIsClickedFile(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3700/files/readFolder")
      .then((res) => setFolders(res.data));
  }, []);
  return (
    <div>
      <h1>cloude drive</h1>

      <h4>folders</h4>
      {folders.length > 0 && folders.map((v) => <div key={v}>{v}</div>)}
      <h4>files</h4>
      {files.map((v) => (
        <div key={v}>{v}</div>
      ))}
      <button onClick={() => setIsClickedFolder(!isClickedFolder)}>
        new folder <img src="images.jfif" alt="plus" />
      </button>
      <div>
        {isClickedFolder && (
          <form onSubmit={folderSubmit}>
            <input
              placeholder="insert folder name"
              onChange={(e) => setFolder(e.target.form[0].value)}
            />
            <button type="submit">create folder</button>
          </form>
        )}
      </div>
      <button onClick={() => setIsClickedFile(!isClickedFile)}>
        upload new file
        <img src="images.jfif" alt="plus" />
      </button>
      <div>
        {isClickedFile && (
          <form onSubmit={fileSubmit}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">upload file</button>
          </form>
        )}
      </div>
    </div>
  );
}
export default Root;
