import {IsString, MinLength} from "class-validator";

export class CreateUserDTO {
  @IsString()
  readonly name: string;
  @MinLength(4)
  readonly password: string;
  readonly email: string;
}