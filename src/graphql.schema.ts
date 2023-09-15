
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewUser {
    email: string;
    password: string;
    name?: Nullable<string>;
}

export class UpdateUser {
    id: number;
    email: string;
    password: string;
    name?: Nullable<string>;
}

export class InputProfile {
    userId: number;
    bio?: Nullable<string>;
}

export class User {
    id: number;
    email: string;
    password: string;
    name?: Nullable<string>;
    created_at: Date;
    active: boolean;
    profile?: Nullable<Profile>;
}

export class Profile {
    id: number;
    bio?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(input: NewUser): User | Promise<User>;

    abstract updateUser(input: UpdateUser): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract setUserProfile(input: InputProfile): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
