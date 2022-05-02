import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserkDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";


@ApiTags('Users')
@Controller('/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }


  @Post()
  create(@Body() dto: CreateUserkDto) {
    return this.usersService.create(dto)
  }
}