import { User } from './user';
import { Avatar } from './avatar';
import { Team } from './team';
import { Station } from './station';

export interface Project {
    id: string;
    _id: string;
    name: string;
    location: string;
    time: string;
    user: User;
    avatar: Avatar;
    userId: string;
    isRunning: boolean;
    team: Team;
    teams: [Team];
    stations: [Station];
}
