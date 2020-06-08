import { Role } from './role';
import { Avatar } from './avatar';
import { TeamDetail } from './teamdetail';

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    rePassword: string;
    fullName: string;
    gender: string;
    dob: string;
    phoneNumber: string;
    address: string;
    role: Role;
    firstLogin: string;
    // tslint:disable-next-line: ban-types
    blocked: Boolean;
    id: string;
    avatar: Avatar;
    teamdetails: TeamDetail [];
    team: string;
}
