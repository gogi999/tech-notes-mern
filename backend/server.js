import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import rootRouter from './routes/root.js';
import errorHandler from './middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import { logger, logEvents } from './middleware/logger.js';
import connectDB from './config/dbConn.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', rootRouter);
app.use('/users', userRoutes);

app.all('*', (req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found!!!' });
    } else {
        res.type('txt').send('404 Not Found!!!');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});
