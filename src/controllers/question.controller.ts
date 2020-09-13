import RestaurantService from '../services/restaurant.service';
import QuestionService from '../services/question.service';
import {NextFunction, Request, Response} from 'express';
import {RestaurantInterface} from '../interfaces/restaurant.interface';
import {CreateRestaurantDto} from '../dtos/restaurant.dto';
import {QuestionInterface} from '../interfaces/question.interface';
import {CreateQuestionDto} from '../dtos/question.dto';

class QuestionController {
  public questionService = new QuestionService();

  public getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allQuestion: QuestionInterface[] = await this.questionService.findAllQuestions();
      res.status(200).json({questions: allQuestion, message: 'findAllQuestions'});
    } catch (error) {
      next(error);
    }
  };

  public findQuestions = async (req: Request, res: Response, next: NextFunction) => {
    const questionData: CreateQuestionDto = req.body;
    try {
      const findQuestions: QuestionInterface[] = await this.questionService.findQuestionByTitleOrContent(questionData.articleTitle);
      res.status(200).json({questions: findQuestions, message: 'findQuestions'});
    } catch (error) {
      next(error);
    }
  };

  public deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questionId: string = req.params.id;
    const password: string = req.body.password;
    try {
      console.log(`PASS: ${password}`);
      if (password === 'rlqhal') {
        const deleteQuestions = await this.questionService.deleteQuestion(questionId);
        res.status(202).json({data: deleteQuestions, message: 'deleted'});
      } else {
        res.status(301).json({message: 'invalid password'});
      }
    } catch (error) {
      next(error);
    }
  };

  public createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const questionData: CreateQuestionDto = req.body;
    try {
      // questionData.title =
      // questionData.content =
      await this.questionService.createQuestion(questionData);
      res.status(201).json({data: questionData, message: 'created'});
    } catch (error) {
      next(error);
    }
  };

}

export default QuestionController;
