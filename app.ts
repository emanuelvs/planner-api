import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import env from 'dotenv'
env.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(morgan('dev'))
app.use(cookieParser(process.env.SECRET))

export default app;