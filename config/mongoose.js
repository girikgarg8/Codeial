// const mongoose = require("mongoose"); // requiring mongoose
// mongoose
// // .connect("mongodb://localhost/codeial_development")
//     .connect(
//         "mongodb+srv://girikgarg:girik1234@cluster1.ztljyxx.mongodb.net/?retryWrites=true&w=majority"
//     )
//     .then(() => {
//         console.log("Connected to Database");
//     })
//     .catch((err) => {
//         console.log("Not Connected to Database ERROR! ", err);
//     });


// const db = mongoose.connection; // if connection succesfull

// module.exports = db; // exporting module
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://girikgarg:girik1234@cluster1.ztljyxx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});