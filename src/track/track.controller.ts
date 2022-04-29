import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateTrackDto, CreateTrackFileDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";
import { ObjectId } from 'mongoose'
import { CreateCommentDto } from "./dto/create-comment.tdo";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";
import { Track } from "./schemas/track.schema";
import { Comment } from "./schemas/comment.schema";
@Controller('/tracks')
export class TrackController {

  constructor(
    private trackService: TrackService
  ) { }

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: 200, type: Track })
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        artist: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        audio: {
          type: 'string',
          format: 'binary',
        },
        picture: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(@UploadedFiles() files: CreateTrackFileDto, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files
    return this.trackService.create(dto, picture[0], audio[0])
  }

  @ApiOperation({ summary: 'Tracks list' })
  @ApiResponse({ status: 200, type: [Track] })
  @Get()
  getAll(
    @Query('count') count: number,
    @Query('offset') offset: number
  ) {
    return this.trackService.getAll(count, offset)
  }

  @Get('/search')
  search(
    @Query('query') query: string,
  ) {
    return this.trackService.search(query)
  }

  @ApiOperation({ summary: 'Get track' })
  @ApiParam({ name: 'id', required: true, description: 'Track id', schema: { type: 'string' } })
  @ApiResponse({ status: 200, type: Track })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id)
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', required: true, description: 'Track id', schema: { type: 'string' } })
  @ApiResponse({ status: 200, type: "6262aba2761d957e6e06b47b" })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id)
  }

  @Post('/comment')
  @ApiOperation({ summary: 'Add comment' })
  @ApiResponse({ status: 200, type: Comment })
  addComent(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto)
  }

  @Post('/listen')
  @ApiOperation({ summary: 'Increase track listen count' })
  @ApiParam({ name: 'id', required: true, description: 'Track id', schema: { type: 'string' } })
  listen(@Body() id: ObjectId) {
    return this.trackService.listen(id);
  }
}