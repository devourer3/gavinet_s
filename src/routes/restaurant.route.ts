import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import RestaurantController from '../controllers/restaurant.controller';

class RestaurantRoute implements Route {
  public path = '/restaurant';
  public router = Router();
  public usersController = new RestaurantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getRestaurants);
    this.router.post(`${this.path}/create`,  this.usersController.createRestaurant);
    // this.router.get(`${this.path}`, this.usersController.getUsers);
    // this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default RestaurantRoute;
