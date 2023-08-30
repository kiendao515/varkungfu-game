import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveDeckDto{
    @ApiProperty({
        type: String,
        example: `{
            "deckId": 1,
            "cardList": {
              "6": 2,
              "7": 1,
              "8": 1,
              "9": 2,
              "10": 1,
              "11": 1
            }
          }`,
      })
      @IsNotEmpty()
      deckStr: string;
}
