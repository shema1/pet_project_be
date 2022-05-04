import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/schemas/user.schema';
import _ from "lodash"
import { jwtSecret } from './constants';
import { CreateUserkDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.usersService.getUserByEmail(email)

    if (!user) {
      return null
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { _id: user._id, name: user.name, email: user.email }
    return { access_token: this.jwtService.sign(payload) }
  }

  async registration(dto: CreateUserkDto): Promise<User> {
    const user = this.usersService.createUser(dto)
    return user
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret
    })
    const user = this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user')
    }

    return user
  }
}
