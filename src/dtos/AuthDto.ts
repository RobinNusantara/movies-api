import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}
