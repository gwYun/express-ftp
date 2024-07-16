import express from "express";
import bodyParser from "body-parser";
import serveIndex from "serve-index";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/files", express.static("./files"), serveIndex("./files", { icons: true }));

app.listen(18000);
