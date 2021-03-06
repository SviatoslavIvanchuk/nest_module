import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(authDto: AuthUserDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const findUser = await this.userService.getByEmail(userDto.email);
    if (findUser) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: AuthUserDto) {
    const userDB = await this.userService.getByEmail(user.email);
    const passwordVerify = await bcrypt.compare(user.password, userDB.password);
    if (userDB && passwordVerify) {
      return userDB;
    }
    throw new UnauthorizedException({ message: 'wrong email or password' });
  }

  async getVerifiUserId(jwt: string): Promise<string> | null {
    try {
      const token = this.getTokenFromJwt(jwt);
      const user = await this.jwtService.verify(token, {
        publicKey: 'secret',
      });
      return user.id;
    } catch (e) {
      console.log(e);
    }
  }

  private getTokenFromJwt(jwt: string) {
    return jwt.split(' ')[1]
  }
}
