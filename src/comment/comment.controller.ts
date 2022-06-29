import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('comment')
export class CommentController {
  constructor(
    @Inject('ALPHIN_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() payload) {
    return this.client.send('createComment', payload);
  }

  @Get()
  findAll() {
    return this.client.send('findAllComment', {});
  }

  @Get('topten-statistics')
  findTopTenStatistics() {
    return this.client.send('topTenStatistics', {});
  }

  @Get('user/:id')
  findAllUserComments(@Param('id') id) {
    return this.client.send('findAllUserComments', id);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.client.send('findOneComment', id);
  }

  @Patch(':id')
  async updateByAdmin(@Param('id') id: string, @Body() updateCommentDto) {
    return this.client.send('updateComment', { id, ...updateCommentDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeComment', id);
  }
}
