import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document
@Schema()
export class User {

  _id: string

  @ApiProperty({ example: 'name'})
  @Prop()
  name: string;

  @ApiProperty({ example: 'email@mail.com' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'password' })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)