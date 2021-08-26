const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const path = require("./paths");
const path2 = require("./paths2");

uri = "mongodb://localhost:27017/mobileno";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mobileNoSchema = new mongoose.Schema({
  Number: String,
  Carrier: String,
  Name: String,
});

const MobilenoModel = mongoose.model("contact", mobileNoSchema);

const folderDir = "F:/truecaller/allcsv234/"; // "F:/truecaller/allcsv/"
var count = path2.length; // path.length = 751  // path2.length = 1130

// async function addToMongo() {
//   console.log("start");

//   for (i = 0; i < count; i++) {
//     console.time("Time Taken ");
//     try {
//       const jsonFormat = await csvtojson().fromFile(`${folderDir + path2[i]}`);
//       await MobilenoModel.insertMany(jsonFormat);

//       console.log(`${i + 1}th file inserted. Remaining : ${count - (i + 1)}`);
//     } catch (error) {
//       console.log(error);
//     }
//     console.timeEnd("Time Taken ");
//   }

//   console.log("end");
// }

// async function findAny(num) {
//   console.log("start");
//   console.time("query time ");
//   const result = await MobilenoModel.findOne({ Number: num });
//   console.log(result);
//   console.timeEnd("query time ");
//   console.log("end");
// }

// findAny("919941004170");
// findAny("917588823999");

//addToMongo();

//TRY 1

// csvtojson()
//   .fromFile(`${folderDir + path[i]}`)
//   .then((csvData) => {
//     console.log(i);
//     MobilenoModel.insertMany(csvData)
//       .then(() => {
//         count++;
//         console.log(`${i + 1}th file inserted. Count : ${count}`);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

//TRY 2

// async function addToMongo() {
//   for (let i = 0; i < 100; i++) {
//     console.log(i);
//     try {
//       const jsonArray = await csvtojson().fromFile(`${folderDir + path[i]}`);
//       try {
//         const result = await MobilenoModel.insertMany(jsonArray);
//         count++;
//         console.log(`${i + 1}th file inserted. Count : ${count}`);
//       } catch (e2) {
//         console.log(`error in mongo insertion : ${e2}`);
//       }
//     } catch (e1) {
//       console.log(`error in csvtojson : ${e1}`);
//     }
//   }
// }
// for (let i = 0; i < 100; i++) {
//   console.log(i);
//   (function (i) {
//     setTimeout(function call() {
//       addToMongo(i);
//     }, 2000);
//   })(i);
// }
