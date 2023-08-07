const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
connectDB();

app.use("/graphql", createHandler({ schema }));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
