import express, {Express} from 'express';
import routes from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import {checkDbConnection} from './config';

env.config();

class App {
    private app: Express;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.database();
    }
    private async database() {
        try {
            await checkDbConnection();
          } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.abort();
          }
    }

    private middlewares() {
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser(process.env.SECRET))
        this.app.use(morgan('dev'))
        
    }
    private routes() {
        this.app.use(routes)
    }
    public get() {
        return this.app
    }
}

export default new App();