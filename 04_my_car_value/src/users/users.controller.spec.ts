import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({ id: 1, email: 'a', password: 'a' } as User),
      find: () =>
        Promise.resolve([
          { id: 1, email: 'test@test.com', password: 'a' },
        ] as User[]),
      update: () =>
        Promise.resolve({ id: 1, email: 'a', password: 'a' } as User),
      remove: (id: number) => Promise.resolve(),
    };

    fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
      signin: () =>
        Promise.resolve({ id: 1, email: 'a', password: 'a' } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('findUser returns a single user', async () => {
    expect(await controller.findUser('1')).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });
});
