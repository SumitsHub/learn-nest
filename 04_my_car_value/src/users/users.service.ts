import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create instance of an entity
    // NOTE: Important to create entity instance in order to trigger hooks tied to entity
    const user = this.repo.create({ email, password });

    // write to the db
    // saving direct object - this won't trigger the entity hooks
    // this.repo.save({ email: 'abc@xyz.com', password: '1234' })

    // saving entity instance - this will trigger the hooks
    return this.repo.save(user);
  }
}
