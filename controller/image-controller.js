import grid from "gridfs-stream";
import mongoose from "mongoose";
//import upload from "../utils/upload.js";

const url = "http://localhost:8000";

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});

export const uploadImage = (request, response) => {
    if(!request.file){
        return response.status(404).json({msg: "File not found"});
    }

    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);
}

/*export const uploadImage = (req, res) => {
    upload(req, res, (err) => {
      console.log("req.file", req);
      if (err) {
        console.log("err", err);
      }
    });
  
    // log the file information to the console for debugging using the following code
    console.log("req.file", req.file);

    //const imageUrl = `${url}/file/${req.file.filename}`;

    //return res.status(200).json(imageUrl);
  
    return res.json({
      success: true,
    });
  };*/

export const getImage = async (req, res) => {
  try{

    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);

  }catch(err){
    console.log("err", err);
  }
}