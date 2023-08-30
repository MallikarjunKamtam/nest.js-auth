import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SinginDto } from './dto/signin.dto';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(body: CreateUserDto) {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new BadRequestException('Email is in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const newUser = await this.userService.create({
      ...body,
      password: result,
    });

    return newUser;
  }

  async signIn(body: SinginDto) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
