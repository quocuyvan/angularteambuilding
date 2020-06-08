import { Project } from './project';
import { TeamDetail } from './teamdetail';
import { TeamLog } from './teamlog';

export interface Team {
    id: string;
    _id: string;
    name: string;
    projectId: string;
    project: Project;
    teamdetail: TeamDetail;
    stationOrder: string;
    teamlogs: [TeamLog];
    currentTeamlog: number;
}
