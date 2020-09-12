import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {User} from '../interfaces/users.interface';
import userModel from '../models/users.model';
import {isEmptyObject} from '../utils/util';
import {RestaurantInterface} from '../interfaces/restaurant.interface';
import restaurantModel from '../models/restaurant.model';
import {CreateRestaurantDto} from '../dtos/restaurant.dto';

// https://donghunee.github.io/study/2019/11/12/mongoose/
// https://pro-self-studier.tistory.com/109
class RestaurantService {
  public restaurant = restaurantModel;

  public async findAllRestaurant(): Promise<RestaurantInterface[]> {
    return this.restaurant.find();
  }

  public async findRestaurantById(resId: string): Promise<RestaurantInterface> {
    const findRestaurant: RestaurantInterface = await this.restaurant.findById(resId);
    if (!findRestaurant) throw new HttpException(409, "You're not user");
    return findRestaurant;
  }

  public async createRestaurant(resData: CreateRestaurantDto): Promise<RestaurantInterface> {
    if (isEmptyObject(resData)) throw new HttpException(400, "You're not resData");
    const findRes: RestaurantInterface = await this.restaurant.findOne({ name: resData.name });
    if (findRes) throw new HttpException(409, `You're restaurant ${findRes.name} already exists`);
    // const createResData: RestaurantInterface = await this.restaurant.create({...resData});
    // return createResData;
    return await this.restaurant.create({...resData});
  }

  // public async updateUser(userId: string, userData: User): Promise<User> {
  //   if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");
  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { ...userData, password: hashedPassword });
  //   if (!updateUserById) throw new HttpException(409, "You're not user");
  //   return updateUserById;
  // }

  // public async deleteUserData(userId: string): Promise<User> {
  //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");
  //   return deleteUserById;
  // }
}

export default RestaurantService;
