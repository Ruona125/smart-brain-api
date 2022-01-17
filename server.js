const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: 123,
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 124,
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare(
    "apples",
    "$2a$10$t.vDe/VsUR15m9jbRj1LzeXCVAnyuk5vZ8twXItTMeHmDB5S2GGyK",
    function (err, res) {
      console.log("first guess ", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$t.vDe/VsUR15m9jbRj1LzeXCVAnyuk5vZ8twXItTMeHmDB5S2GGyK",
    function (err, res) {
      console.log("second guess ", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.send("singin post");
  } else {
    res.status(400).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: 123,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    found = true;
    if (user.id == id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
