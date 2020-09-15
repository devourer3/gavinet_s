import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as bcrypt from 'bcrypt';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import restaurantModel from './models/restaurant.model';

// https://www.npmjs.com/package/typescript-express-starter
// npm install typescript-express-starter
class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8888;
    this.env = process.env.NODE_ENV === 'production' ? true : false;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({
                          exposedHeaders: 'Authorization', credentials: true
                        })); // 커스텀 헤더 설정
      // this.app.use(cors({origin: 'your.domain.com', credentials: true}));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors());
      // this.app.use(cors({origin: true, credentials: true}));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase() {
    const {MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE} = process.env;
    const options = {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}?retryWrites=true&w=majority`, {...options})
      .then((value) => {
        console.log('Connected!');
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }
}

export default App;
