import {NextFunction, Request, Response} from 'express';
import {CreateUserDto} from '../dtos/users.dto';
import {User} from '../interfaces/users.interface';
import UserService from '../services/users.service';
import restaurantModel from '../models/restaurant.model';
import RestaurantService from '../services/restaurant.service';
import {RestaurantInterface} from '../interfaces/restaurant.interface';
import {CreateRestaurantDto} from '../dtos/restaurant.dto';

class RestaurantController {
  public restaurantService = new RestaurantService();

  public getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allRestaurant: RestaurantInterface[] = await this.restaurantService.findAllRestaurant();
      res.status(200).json({ data: allRestaurant, message: 'findAllRes' });
    } catch (error) {
      next(error);
    }
  };

  public createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const resData: CreateRestaurantDto = req.body;
    try {
      resData.name = "김밥천국"
      resData.latX = "38.3546"
      resData.latY = "44.3546"
      const createResData: RestaurantInterface = await this.restaurantService.createRestaurant(resData);
      res.status(201).json({ data: createResData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }
}

export default RestaurantController;
