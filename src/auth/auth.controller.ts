import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request } from "express";
import { CreateUserkDto } from "src/users/dto/create-user.dto";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as User)
  }

  @Post('registration')
  registration(@Body() dto: CreateUserkDto) {
    return this.authService.registration(dto)
  }
}