import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';
import validateEnv from './utils/validateEnv';
import RestaurantRoute from './routes/restaurant.route';
import QuestionRoute from './routes/question.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new QuestionRoute(),
  new RestaurantRoute(),
]);

app.listen();
