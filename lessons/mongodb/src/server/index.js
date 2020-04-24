const express = require("express");
const { PORT } = require("./config");
const usersRouter = require("./routers/usersRouter");
const bodyParser = require("body-parser");

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(
    JSON.stringify({
      url: req.url,
      time: new Date(),
    })
  );
  next();
});

app.use(express.static("build"));
app.use("/api", usersRouter);

/* 404 */
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

/* Error */
app.use((err, req, res, next) => {
  console.log(err);
  if (err.isInternal) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Oops something went wrong" });
  }
});

/* start */
app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}`);
});
