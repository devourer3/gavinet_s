import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import {isEmptyObject} from '../utils/util';
import questionModel from '../models/question.model';
import {QuestionInterface} from '../interfaces/question.interface';
import {CreateQuestionDto} from '../dtos/question.dto';

// https://donghunee.github.io/study/2019/11/12/mongoose/
// https://pro-self-studier.tistory.com/109
class QuestionService {
  public question = questionModel;

  public async findAllQuestions(): Promise<QuestionInterface[]> {
    return this.question.find();
  }

  public async findQuestionByTitle(query: string): Promise<QuestionInterface[]> {
    let likeRegex:RegExp = new RegExp(".*" + query + ".*"); // like query
    const findQuestion = await this.question.find().or(
      [{articleTitle: likeRegex},
        {articleContent: likeRegex}]
    );
    // const findQuestion = await this.question.find({articleTitle: new RegExp('^'+query+'$', "i")});
    if (!findQuestion) throw new HttpException(409, "There are no questions what you want.");
    return findQuestion;
  }

  public async createQuestion(questionData: CreateQuestionDto): Promise<QuestionInterface> {
    if (isEmptyObject(questionData)) throw new HttpException(400, "You're not question data");
    const findQuestion: QuestionInterface = await this.question.findOne({title: questionData.articleTitle});
    if (findQuestion) throw new HttpException(409, `You're Question ${findQuestion.articleTitle} already exists`);
    // const createResData: QuestionInterface = await this.Question.create({...resData});
    // return createResData;
    return await this.question.create({...questionData});
  }
}

export default QuestionService;
