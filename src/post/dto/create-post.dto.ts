import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsBoolean()
  public published: boolean;

  @IsNumber()
  public likes: number;
}
