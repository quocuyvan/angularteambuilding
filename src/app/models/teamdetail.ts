import { Team } from './team';
import { User } from './user';

export interface TeamDetail {
    id: string;
    _id: string;
    userId: string;
    teamId: string;
    team: Team;
    user: User;
}
