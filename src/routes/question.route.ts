import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import RestaurantController from '../controllers/restaurant.controller';
import QuestionController from '../controllers/question.controller';

class QuestionRoute implements Route {
  public path = '/question';
  public router = Router();
  public questionController = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.questionController.getQuestions);
    this.router.post(`${this.path}/search`,  this.questionController.findQuestions);
    this.router.post(`${this.path}/create`,  this.questionController.createQuestion);
    // this.router.get(`${this.path}`, this.usersController.getUsers);
    // this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default QuestionRoute;
