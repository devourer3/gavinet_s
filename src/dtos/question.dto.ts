import { IsEmail, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  public articleTitle: string;

  @IsString()
  public articleContent: string;

}
