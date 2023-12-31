import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
    @Prop()
    username:string;

    @Prop()
    password:string;

    @Prop()
    currentLevel:Number;

    @Prop()
    expProgress:Number;

    @Prop()
    stats:string;

}
export const UserSchema = SchemaFactory.createForClass(User);