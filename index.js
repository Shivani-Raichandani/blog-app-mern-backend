import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import router from './routes/route.js';
import dot


const app = express();

//const PORT = 8000;
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

//for suppressing the strictQuery warning
mongoose.set('strictQuery', false);

Connection();
