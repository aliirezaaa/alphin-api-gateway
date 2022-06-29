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

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  @Post()
  create(@Body() payload) {
    return this.client.send('createUser', payload);
  }

  @Get()
  findAll() {
    return this.client.send('findAllUser', {});
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.client.send('findOneUser', id);
  }
  @Patch(':id')
  async updateByAdmin(@Param('id') id: string, @Body() updateUserDto) {
    return this.client.send('updateUser', { id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeUser', id);
  }
}
