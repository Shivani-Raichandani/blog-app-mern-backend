import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connection = null;

const Connection = async () =>{
    const URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-vaptnv7-shard-00-00.pdjd463.mongodb.net:27017,ac-vaptnv7-shard-00-01.pdjd463.mongodb.net:27017,ac-vaptnv7-shard-00-02.pdjd463.mongodb.net:27017/?ssl=true&replicaSet=atlas-ou4xgh-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        if (!connection) {
            connection = await mongoose.connect(URL, { useNewUrlParser: true });
          }
      
          return connection;
        /*await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully')*/
    }
    catch(error){
        console.log('Error while connecting', error); 
    }
};

export default Connection;