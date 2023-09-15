import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersResolvers } from './users.resolver';

@Module({
  providers: [UsersService, UsersResolvers],
  imports: [PrismaModule]
})
export class UsersModule { }
