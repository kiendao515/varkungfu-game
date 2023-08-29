import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Deck } from "src/modules/deck/entities/deck.entity";
import { User } from "src/modules/user/entities/user.entity";
export type CardDocument = HydratedDocument<Card>;
@Schema()
export class Card {
    @Prop()
    cardId:string;

    @Prop()
    cardNumber:number;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Deck' 
    })
    deck: Deck;
}
export const CardSchema = SchemaFactory.createForClass(Card);