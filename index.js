import express from "express";
import bodyParser from "body-parser";
import serveIndex from "serve-index";
import cors from "cors";
import fs from "fs"; // Import fs module

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/files", express.static("./files"), serveIndex("./files", { icons: true }));

// New route to return the list of files
app.get("/files-list/:server/:quarter/:angle", (req, res) => {
    // Decode and sanitize the input path. Here, we're using a simple decodeURIComponent for demonstration.
    // In a real application, you should rigorously validate and sanitize this input to avoid security issues like directory traversal attacks.
    const serverPath = decodeURIComponent(req.params.server);
    const quarterPath = decodeURIComponent(req.params.quarter);
    const anglePath = decodeURIComponent(req.params.angle);

    console.log("got request:", serverPath, quarterPath, anglePath);
  
    // Basic sanitation example - restrict to a specific base directory (e.g., "./files")
    // This is a very basic form of validation and should be enhanced based on your use case.
    // directoryPath = directoryPath.replace(/(\.\.\/|\/)/g, ''); // Remove ../ and / to keep the path within the base directory
    const directoryPath = `./files/${serverPath}/${quarterPath}/${anglePath}`; // Prepend the base directory
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res.status(500).send("Unable to read the directory");
      } else {
        res.json(files);
      }
    });
  });

// New route to return the list of files
app.get("/files-list/tutorial", (req, res) => {

  console.log("got request:", 'tutorial');

  // Basic sanitation example - restrict to a specific base directory (e.g., "./files")
  // This is a very basic form of validation and should be enhanced based on your use case.
  // directoryPath = directoryPath.replace(/(\.\.\/|\/)/g, ''); // Remove ../ and / to keep the path within the base directory
  const directoryPath = `./files/tutorial`; // Prepend the base directory

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send("Unable to read the directory");
    } else {
      res.json(files);
    }
  });
});

app.listen(8000);