import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessageService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesRepository, MessageService], // providers that will be instantiated by the Nest injector and that may be shared at least across this module
})
export class MessagesModule {}
