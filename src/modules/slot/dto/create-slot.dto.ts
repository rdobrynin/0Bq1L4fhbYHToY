import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSlotDto {

  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  timeStart: string;

  @IsString()
  @IsNotEmpty()
  timeEnd: string;
}
