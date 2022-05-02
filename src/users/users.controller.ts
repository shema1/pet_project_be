import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ObjectId } from 'mongoose'
import { CreateUserkDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";


@ApiTags('Users')
@Controller('/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }


  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  create(@Body() dto: CreateUserkDto) {
    return this.usersService.createUser(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  getUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'id', required: true, description: 'User id', schema: { type: 'string' } })
  getUser(id: ObjectId) {
    return this.usersService.getUser(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  updateUser(@Param('id') id, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', required: true, description: 'User id', schema: { type: 'string' } })
  @ApiResponse({ status: 200, type: "6262aba2761d957e6e06b47b" })
  deleteUser(@Param('id') id: ObjectId) {
    return this.deleteUser(id)
  }
}