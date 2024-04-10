const express = require("express");
const app = express();
const mailRoutes = require("./routes/mailRoutes");

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with the appropriate origin(s) for your application
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.urlencoded({ extended: true }));

app.post("/test", (req, res) => {
  console.log(req.body.username);
  console.log(process.env.V);

  res.send("Welcome");
});

app.use("/api", mailRoutes);

//All unhandled requests
app.all("*", (req, res) => res.send("Invalid Request"));

module.exports = app;
