const mongoose = require("mongoose");
uri = "mongodb://localhost:27017/mobileno";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to db"));

const authorSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

const coursesSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model("Course", coursesSchema);

async function createAuther(name, rating) {
  const author = new Author({
    name,
    rating,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(course);
}

async function listCorses() {
  const courses = await Course.find()
    .populate({ path: "auther" })
    .select("name author -_id");
  console.log(courses);
}

// createAuther("vishal", 4);
// createCourse("node", "6110f677d814cf1640ad1d0d");

listCorses();
