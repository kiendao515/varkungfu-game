import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/user/entities/user.entity";
export type DeckDocument = HydratedDocument<Deck>;
@Schema()
export class Deck {
    @Prop()
    deckId:string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    })
    user: User;
}
export const DeckSchema = SchemaFactory.createForClass(Deck);