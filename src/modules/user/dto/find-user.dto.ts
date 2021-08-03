import {
    IsString,
  } from 'class-validator';

export class FindUserDto {

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

}
