import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ClassSerializerInterceptor,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  Serialize,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user';
import { User } from './user.entity';
import { UserGuard } from '../guards/user';

// Parameter decorators used in this file:
// @Body() - extract the entire body of the request
// @Param() - extract a single parameter from the route
// @Query() - extract query parameters from the request
// @Session() - extract session data from the request
// @CurrentUser() - extract the current user from the request
// @UseGuards() - apply guards to the route


@Controller('auth') // Prefixing all routes with /auth (e.g., /auth/signup, /auth/signin)
@Serialize(UserDto) // Using custom decorator to serialize response data
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // console.log(body); // Output: { email: 'a', password: 'a' }
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // Using @Session decorator
  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  // Using custom decorator
  @Get('/whoami2')
  @UseGuards(UserGuard) // Applying guard to the route - used to protect the route from unauthorized access
  whoAmI2(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // console.log('signin', body); // Output: { email: 'a', password: 'a' }
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto)) - used to serialize response data using custom interceptor, replaced with @Serialize decorator above
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  // Routes to test cookie
  @Get('/session/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color; // setting color property to cookie
  }

  @Get('/session/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
}
