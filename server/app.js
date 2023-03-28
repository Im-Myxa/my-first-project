const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const chalk = require("chalk");
const path = require("path");
const router = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}
mongoose.syncIndexes("strictQuery", true);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
