import express from 'express';
import connection from './database/connection.js';
import dotenv from 'dotenv';
import Router from './routes/route.js'
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express();

dotenv.config();

const PORT=8000;
const username=process.env.db_username;
const password=process.env.db_password;

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',Router);
app.listen(PORT, ()=>{console.log(`Server is running on ${PORT}`)});
connection(username,password);