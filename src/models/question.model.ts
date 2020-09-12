import * as mongoose from 'mongoose';
import { QuestionInterface} from '../interfaces/question.interface';

const questionSchema = new mongoose.Schema({ articleTitle: String, articleContent: String });

const questionModel = mongoose.model<QuestionInterface & mongoose.Document>('cs', questionSchema, 'cs');

export default questionModel;
