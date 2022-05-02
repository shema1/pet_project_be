import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserkDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(dto: CreateUserkDto): Promise<User> {
    const user = await this.userModel.create({ ...dto })
    return user
  }
}