const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db/connect');


const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use(require("./router/record"));


app.listen(PORT, ()=>{
    db.connectToServer(function (err) {
        if (err) console.error(err);
      });
    console.log(`Listening on port ${PORT}...`);
})