const express = require("express"),
  app = express(),
  PORT = 3700;

app.use(require("cors")());
app.use(express.json());
const mainRouter = require("./mainRouter");
app.use("/", mainRouter);
app.listen(process.env.PORT || PORT, () => {
  console.log("connection success");
});
