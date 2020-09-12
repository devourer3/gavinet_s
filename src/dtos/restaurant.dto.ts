import { IsEmail, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  public name: string;

  @IsString()
  public latX: string;

  @IsString()
  public latY: string;
}
