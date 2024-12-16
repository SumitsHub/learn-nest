import { MessagesRepository } from './messages.repository';

export class MessageService {
  messageRepo: MessagesRepository;

  constructor() {
    // Service is creating its own dependencies
    // DON'T DO THIS ON REAL APP - DEPENDENCY INJECTION
    this.messageRepo = new MessagesRepository();
  }

  findOne(id: string) {
    return this.messageRepo.findOne(id);
  }

  findAll() {
    return this.messageRepo.findAll();
  }

  create(content: string) {
    return this.messageRepo.create(content);
  }
}
