/**
 * This is the starting file of the projrct
 */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const  server_config = require("./configs/server.config")

const db_config = require("./configs/db.config")

const user_model = require("./models/user.model")

const bcrypt = require("bcrypt");

/* Create an admin user at the  starting of the application, if not already prsent
*/

//Connections with mongoDB

mongoose.connect(db_config.db_URL);
const db = mongoose.connection;

db.on("error" , ()=>{
    console.log("Error While connecting withe mongoose database");
   
})

db.once("open" , ()=>{
    console.log("Connexted To MongoDB");
    init();
})

async function init(){

    try {
        let user = await user_model.findOne({userId: "admin"});

        if(user){
        console.log("Admin is already Present");
        return
    }
    } catch(error) {
        console.log(`Error Happen`,error);
    }

    
    try{
        user = await user_model.create({
            name: "Durga",
            userId: "admin",
            email: "durga@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("welcome1",8)
        })
        console.log(`Admin Created`,user);
        }catch(err){
        console.log(`Error was` , err);
        }
}


//Start The Server
app.listen(server_config.PORT,()=>{
    console.log(`Server Started`);
})