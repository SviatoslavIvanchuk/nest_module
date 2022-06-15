import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../core/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => (AuthModule))
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
})
export class UserModule {}
