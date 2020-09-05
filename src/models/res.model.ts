import * as mongoose from 'mongoose';
import { Restaurant } from '../interfaces/res.interface';

const resSchema = new mongoose.Schema({ name: String, xloc: String, yloc: String });

const resModel = mongoose.model<Restaurant & mongoose.Document>('res', resSchema);

export default resModel;
