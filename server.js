const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const app = require("./app");

app.listen(5000, () => console.log("listening at port 5000."));
