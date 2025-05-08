const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const fs = require("fs");

const cifs = require("./index");
const response = require("../../../network/response");

const storage = multer.diskStorage({
  destination(req, res, cb) {
    console.log(req.body);
    const route = path.join(__dirname, `./resources`);
    fs.mkdirSync(route, { recursive: true });
    cb(null, route);
  },
  filename(req, file, cb) {
    const filename = "cifs.xlsx";
    cb(null, filename);
  },
});

let upload = multer({ storage });

router.post("/update", upload.single("file"), update);
router.post("/upload", upload.single("file"), uploader);

function update(req, res) {
  console.log(req.body.authNumber);
  cifs
    .update(req.body.authNumber, req.body.paymentNum)
    .then((message) => {
      response.success(req, res, 200, message);
    })
    .catch(({ error }) => {
      response.error(req, res, error?.code, error?.message);
    });
}

function uploader(req, res) {
  // console.log(req.body);
  cifs
    .uploader()
    .then((message) => {
      response.success(req, res, 200, message);
    })
    .catch(({ error }) => {
      response.error(req, res, error?.code, error?.message);
    });
}

module.exports = router;
