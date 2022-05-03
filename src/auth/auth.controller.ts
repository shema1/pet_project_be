import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request } from "express";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<{ access_token: string }> {
    console.log("req", req.user)
    return this.authService.login(req.user as User)
  }
}