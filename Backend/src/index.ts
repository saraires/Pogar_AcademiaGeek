import express, { Application } from 'express';
const app: Application = express();

import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import authRoute from './routes/routes'

// Configuracion
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoute);

// Conexión a la base de datos (cluster de Mongo)
mongoose.connect(
    'mongodb+srv://sarai:12345@cluster1.jr4tq.mongodb.net/pogar?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => console.log('Estas conectado a la base de datos')
);

app.listen(5001, () => console.log('Servidor corriendo en el puerto 5001'));