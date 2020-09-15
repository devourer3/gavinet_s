import HttpException from '../exceptions/HttpException';
import {isEmptyObject, logObjectToJson} from '../utils/util';
import questionModel from '../models/question.model';
import {QuestionInterface} from '../interfaces/question.interface';
import {CreateQuestionDto} from '../dtos/question.dto';

// https://donghunee.github.io/study/2019/11/12/mongoose/
// https://pro-self-studier.tistory.com/109
class QuestionService {
  public question = questionModel;

  public async findAllQuestions(): Promise<QuestionInterface[]> {
    return this.question.find().sort([['_id', -1]]); // 1(정순) -1(역순)
  }

  public async findQuestionByTitleOrContent(query: string): Promise<QuestionInterface[]> {
    try {
    let likeRegex:RegExp = new RegExp(".*" + "\\" + query + "\\" + ".*"); // like query
    const findQuestion = await this.question.find().or(
      [{articleTitle: likeRegex},
        {articleContent: likeRegex}]
    ).sort([['_id', -1]]);
    // const findQuestion = await this.question.find({articleTitle: new RegExp('^'+query+'$', "i")});
    if (!findQuestion) new HttpException(409, "There are no questions what you want.");
    return findQuestion;
    } catch (err) {
      console.log(`ERR: ${err}`);
      throw new HttpException(406, err);
    }
  }

  public async createQuestion(questionData: CreateQuestionDto): Promise<QuestionInterface> {
    if (isEmptyObject(questionData)) throw new HttpException(400, "You're not question data");
    const findQuestion: QuestionInterface = await this.question.findOne({title: questionData.articleTitle});
    if (findQuestion) throw new HttpException(409, `You're Question ${findQuestion.articleTitle} already exists`);
    // const createResData: QuestionInterface = await this.Question.create({...resData});
    // return createResData;
    return await this.question.create({...questionData});
  }

  public async modifyQuestion(_id: string, questionData: CreateQuestionDto): Promise<QuestionInterface> {
    logObjectToJson(questionData);
    console.log(`ID: ${_id}`);

    if (isEmptyObject(questionData)) throw new HttpException(400, "You're not question data!");
    const findQuestion: QuestionInterface = await this.question.findOne({_id: _id});
    if (findQuestion) {
      return this.question.findByIdAndUpdate(_id, {...questionData});
    } else {
      throw new HttpException(409, `You're Question ${findQuestion.articleTitle} isn't Exist!`);
    }
    // const createResData: QuestionInterface = await this.Question.create({...resData});
    // return createResData;
  }

  public async deleteQuestion(_id: string): Promise<QuestionInterface> {
    try {
      return await this.question.findByIdAndDelete(_id);
    } catch (err) {
      throw new HttpException(409, `Delete failed`);
    }
  }
}

export default QuestionService;
