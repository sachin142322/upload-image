const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  var response = '<a href="/">Home</a><br>';
  response += "Files uploaded successfully.<br>";
  response += `<img src="${req.file.path}" /><br>`;
  return res.send(response)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});