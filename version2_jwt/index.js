const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


//set the express app
const app = express();

//connect to mongodb
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json());

app.use("/bitly", require("./routes/bitly"));
app.use("/converter", require("./routes/converter"));
app.use("/converted", require("./routes/converted"));
app.use("/profile", require("./routes/profile"));
app.use("/telegram", require("./routes/telegram"));
app.use("/trendingdeals", require("./routes/trending_deals"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));


//err handling middleware
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(404).send({ err: err.message });
});


app.listen(5000, () =>
  console.log(`-----------------------server is running on port 5000-----------------------------`)
);
module.exports = app;
