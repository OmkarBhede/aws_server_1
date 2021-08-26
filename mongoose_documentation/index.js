const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mernone:mernonepass@cluster0.djj6y.mongodb.net/bezcoderauth?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("connected!!");
});

const kittenSchema = new mongoose.Schema({
  name: String,
});

const kitten = mongoose.model("kitten", kittenSchema);

const minu = new kitten({ name: "minu" });

console.log(minu.name);

minu.save(function (err, minu) {
  if (err) return console.log(err);
  console.log(minu.name);
});

kitten.find(function (err, kittens) {
  if (err) return cosole.log(err);
  console.log(kittens);
});


