import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteDeckDto {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    order: number;
}
