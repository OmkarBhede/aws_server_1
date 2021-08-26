const db = require("../mongo_models/index.js");

const ROLES = db.ROLES;
const User = db.User;

checkDuplicateEmailorName = (req, res, next) => {
  //check Username

  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }

    if (user) {
      res.status(400).send({ message: "Failed! user exists" });
    }

    //check Email

    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (user) {
        res.status(400).send({ message: "Failed! email is registered" });
      }

      next();
    });
  });
};

checkRolesExixted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exists`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmailorName,
  checkRolesExixted,
};

module.exports = verifySignUp;
