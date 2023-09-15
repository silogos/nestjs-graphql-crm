import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { InputProfile, NewUser, UpdateUser } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async create(input: NewUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: input.password,
          active: true,
          created_at: new Date()
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Oops! This email is already registered. Please use a different email address.');
        }
      }

      throw new Error('Error when create user');
    }
  }

  async update(params: UpdateUser): Promise<User> {
    const { id, ...params_without_id } = params;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getProfile(userId: number): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        userId: userId
      }
    })
  }

  async setProfile(input: InputProfile): Promise<User | null> {
    try {
      await this.prisma.profile.upsert({
        where: {
          userId: input.userId
        },
        create: {
          userId: input.userId,
          bio: input.bio
        },
        update: {
          bio: input.bio
        }
      });

      return await this.findOne(input.userId);
    } catch (error) {
      throw new Error('Error when set user profile');
    }
  }
}