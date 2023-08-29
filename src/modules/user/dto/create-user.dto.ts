import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        example: 'usertest',
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        example: '123456',
    })
    @IsNotEmpty()
    password: string;

}
