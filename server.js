let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
reloadMagic(app);
let cookieParser = require("cookie-parser");
app.use(cookieParser());
// let sha1 = require("sha1");
app.use("/", express.static("build"));
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://a:a@cluster0-zknku.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibay-login");
});
// Nate is great
reloadMagic(app);
let sessions = {};
// changed items to an array
let items = [];

let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  console.log("TESTING:", name, pwd);
  dbo.collection("users").insertOne({ username: name, password: pwd });
  res.send(JSON.stringify({ success: true }));
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
    }
    if (user.password === password) {
      console.log("password matches");
      let sessionId = generateId();
      console.log("generated id", sessionId);
      sessions[sessionId] = username;
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    if (user.password === null) {
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: false }));
  });
});

app.post("/logout", upload.none(), (req, res) => {
  res.send(JSON.stringify({ success: false }));
});
app.post("/addCart", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
});

app.post("/addItem", upload.single("thepic"), (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let itemName = req.body.title;
  let itemPrice = req.body.price;
  let itemDesc = req.body.description;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  let itemId = generateId();
  let newItem = {
    description: itemName,
    price: itemPrice,
    desc: itemDesc,
    image: frontendPath,
    seller: username,
    sellerId: req.cookies.sid,
    itemId: itemId
  };
  items = items.concat(newItem);
  res.send(JSON.stringify({ newItem }));
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
