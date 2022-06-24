const mongoose = require('mongoose');
const env=require('./environment');
mongoose.connect('mongodb+srv://girikgarg:girik1234@cluster1.ztljyxx.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;