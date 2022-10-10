const {MongoClient, ServerApiVersion} = require("mongodb");
// const mongoose = require("mongoose");
// username: aurora
// password: 123456+*
const dbURI = "mongodb+srv://aurora:123456+*@cluster0.ovdk0r0.mongodb.net/test";

// const connectDB = async() =>{
//     try{
//         mongoose.connect(dbURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("mongoDB connected");
//     }catch(e){
//         console.error(e);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;

const client = new MongoClient(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });
   
  var _db;
  
  module.exports = {
    connectToServer: function (callback) {
        client.connect((err, db) =>  {
            if (db){
            _db = db.db("test");
            console.log("Successfully connected to MongoDB."); 
            }
            return callback(err);
        });
    },
   
    getDb: function () {
      return _db;
    },
  };