import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { InputProfile, NewUser, Profile, UpdateUser, User } from 'src/graphql.schema';
import { UsersService } from './users.service';


@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) { }

  @Query('users')
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query('user')
  async user(@Args('id') args: number): Promise<User | null> {
    return this.userService.findOne(args);
  }

  @ResolveField('profile')
  async profile(@Parent() user: User): Promise<Profile | null> {
    return this.userService.getProfile(user.id)
  }

  @Mutation('createUser')
  async create(@Args('input') args: NewUser): Promise<User> {
    return this.userService.create(args);;
  }

  @Mutation('updateUser')
  async update(@Args('input') args: UpdateUser): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation('deleteUser')
  async delete(@Args('id') args: number): Promise<User> {
    return this.userService.delete(args);
  }

  @Mutation('setUserProfile')
  async createUserProfile(@Args('input') args: InputProfile): Promise<User | null> {
    return this.userService.setProfile(args);
  }
}