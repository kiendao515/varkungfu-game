import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InitDeckDto {
    @ApiProperty({
        type: String,
        example: '',
    })
    @IsNotEmpty()
    userId: string;
}
