import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRoute from "./routes/StudentRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

//stockage photo  config
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const __filename = fileURLToPath(import.meta.url);
const __dirnames = path.dirname(__filename);
app.use("/storages", express.static(path.join(__dirnames, "storages")));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("img"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));app.use(express.json())
//routes

app.get("/", (req, res) => {
  res.send("GG API running");
});
//route about student
app.use("/student", studentRoute);



const connexiontobdd = process.env.URI;
const PORT = process.env.PORT || 5200;
mongoose
  .connect(connexiontobdd, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
