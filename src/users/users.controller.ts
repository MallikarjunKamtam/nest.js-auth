import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { SinginDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/gaurds/auth.guard';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authSerice: AuthService,
  ) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return 'Sign out success !!';
  }

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authSerice.signUp(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async singin(@Body() body: SinginDto, @Session() session: any) {
    const user = await this.authSerice.signIn(body);
    session.userId = user.id;
    return user;
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  findAll(@Session() session: any) {
    const { userId } = session;

    return this.usersService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
