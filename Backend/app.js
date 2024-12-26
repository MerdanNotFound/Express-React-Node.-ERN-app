const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

let users = [
  {
    Name: "Merdan",
    Email: "merdan@gmail.com",
    Password: "qwerty123",
  },
];

// GET Users
app.get("/home", (req, res) => {
  console.log("Fetching users...");
  res.status(200).json(users);
});

// POST Create User
app.post("/create", (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const newUser = { Name, Email, Password };
  users.push(newUser);

  console.log("User Added:", newUser);
  res.status(201).json({ message: "User created successfully!", users });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
