import { Document } from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class User extends Document {
    @Prop()
    readonly name: string;
    @Prop()
    readonly password: string;

    @Prop({
        unique: true,
        index: true
    })
    readonly email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);