const mongoose = require("mongoose"); // requiring mongoose
mongoose
// .connect("mongodb://localhost/codeial_development")
    .connect(
        "mongodb+srv://girikgarg:girik1234@cluster1.ztljyxx.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });


const db = mongoose.connection; // if connection succesfull

module.exports = db; // exporting module