import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  // Injecting the User repository into the UsersService class using the @InjectRepository decorator
  // The @InjectRepository decorator takes an entity class as an argument and injects the repository for that entity into the class
  // The repository is an object that provides methods to interact with the database (e.g., find, save, update, delete)
  // The repository is automatically created by 'TypeORM' based on the entity class and database connection

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

  findOne(id: number) {
    if (!id) return null;
    const user = this.repo.findOne({ where: { id } });
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found!');

    Object.assign(user, attrs); // merge the existing user with the new attributes (attrs)

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');
    //* delete() vs remove()
    // this.repo.delete(id); // won't trigger any hook
    this.repo.remove(user); // will trigger associated hook
  }
}
