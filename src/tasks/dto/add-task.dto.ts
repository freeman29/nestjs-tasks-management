import { IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
