const db = require("../mongo_models/index");

const Role = db.role;
const user = db.user;
const ROLES = db.ROLES;

const uri =
  "mongodb+srv://mernone:mernonepass@cluster0.djj6y.mongodb.net/bezcoderauth?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await db.mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("hi");

    initialDB();
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error : ${e}`);
    process.exit();
  }
};

initialDB = () => {
  Role.estimatedDocumentCount((error, count) => {
    if (!error && count === 0) {
      new Role({ name: "user" }).save((err) => {
        if (err) {
          console.log(`error : ${err}`);
        }
        console.log("added user to roles collection");
      });
      new Role({ name: "moderator" }).save((err) => {
        if (err) {
          console.log(`error : ${err}`);
        }
        console.log("added moderator to roles collection");
      });
      new Role({ name: "admin" }).save((err) => {
        if (err) {
          console.log(`error : ${err}`);
        }
        console.log("added admin to roles collection");
      });
    }
  });
};

module.exports = connectDB;
