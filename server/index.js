import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';


//routes
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/users.routes.js';

//setting
const app = express();

dotenv.config();


//configuramos body-parse para LIMITAR la cantidad compatibilidad de tamaño de la img
app.use(bodyParse.json({ limit: '30mb', extended: true }));
app.use(bodyParse.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(morgan('dev'));

//routes
//https://www.restapitutorial.com/httpstatuscodes.html
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.get('/api/', (req, res) => {
        res.send("Hello to Memories Api")
});

//Connection
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}/api/`)))
        .catch((err) => console.log(err.message));
