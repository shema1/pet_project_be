import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
    // super()
  }

  async validate(email: string, password: string): Promise<User> {
    console.log("email", email, "password", password)
    const user = this.authService.validate(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user;
  }
}