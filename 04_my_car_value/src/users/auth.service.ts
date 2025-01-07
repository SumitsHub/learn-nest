import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.userService.find(email);
    if (users.length) throw new BadRequestException('email in use');

    // Hash the password
    //1. generate a salt
    const salt = randomBytes(8).toString('hex'); // randomBytes returns a buffer, so we convert it to a string

    //2. hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer; // scrypt returns a buffer, so we cast it to a Buffer

    //3. join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex'); // store the salt and the hashed password together

    // create a new user and save
    const user = await this.userService.create(email, result); // create a new user with the email and the hashed password

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
