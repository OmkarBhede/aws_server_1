const jwt = require("jsonwebtoken");
const key = "JWT_KEY";
const db = require("../mongo_models/index");

const User = db.user;
const Role = db.role;

