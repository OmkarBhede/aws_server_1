const jwt = require("jsonwebtoken");

const token = jwt.sign({ name: "omkar" }, "secret-key");

console.log(token);

const decoded = jwt.verify(token, "secret-key");

console.log(decoded);
