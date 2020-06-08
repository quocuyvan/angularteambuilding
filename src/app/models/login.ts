import { User } from './user';

export interface Login {
    user: User;
    jwt: string;
}
