import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SaveStatsDto{
    @ApiProperty({
        type: String,
        example: `{
            "currentHP": 1,
            "currentMP": 2,
            "currentAP": 2,
            "gold": 1,
            "armorPnt": 1,
            "poisonPnt": 2
            }
          }`,
      })
      @IsNotEmpty()
      statStr: string;
}
