import { Team } from './team';
import { Station } from './station';

export interface TeamLog {
    id: string;
    _id: string;
    name: string;
    order: number;
    time: string;
    team: Team;
    station: Station;
}
