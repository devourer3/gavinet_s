import { NextFunction, Request, Response } from 'express';
import {User} from '../interfaces/users.interface';
import restaurantModel from '../models/restaurant.model';

class IndexController {

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
      // res.status(200).json({ data: , message: 'mongoose' });
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
