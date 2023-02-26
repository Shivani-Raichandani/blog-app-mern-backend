import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

import Connection from "../database/db.js";


dotenv.config();

//const username = process.env.DB_USERNAME;
//const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    db: Connection(),
    //url: `mongodb://${username}:${password}@ac-vaptnv7-shard-00-00.pdjd463.mongodb.net:27017,ac-vaptnv7-shard-00-01.pdjd463.mongodb.net:27017,ac-vaptnv7-shard-00-02.pdjd463.mongodb.net:27017/?ssl=true&replicaSet=atlas-ou4xgh-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { newUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({
    storage: storage,
  }).single("file");

export default upload;