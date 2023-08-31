import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/user/entities/user.entity";
export type DeckDocument = HydratedDocument<Deck>;
@Schema()
export class Deck {
    @Prop()
    deckStr: string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    })
    user: User;

    @Prop()
    order:number;
}
export const DeckSchema = SchemaFactory.createForClass(Deck);