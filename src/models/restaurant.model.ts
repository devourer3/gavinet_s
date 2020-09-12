import * as mongoose from 'mongoose';
import { RestaurantInterface } from '../interfaces/restaurant.interface';

const resSchema = new mongoose.Schema({ name: String, latX: String, latY: String });

const restaurantModel = mongoose.model<RestaurantInterface & mongoose.Document>('res', resSchema, 'res');

export default restaurantModel;
