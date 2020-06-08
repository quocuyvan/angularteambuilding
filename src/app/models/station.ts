import { Project } from './project';
import { Avatar } from './avatar';

export interface Station {
    id: string;
    _id: string;
    name: string;
    location: string;
    time: string;
    score: string;
    inputId: string;
    outputId: string;
    descriptionzId: string;
    password: string;
    project: Project;
    input: Avatar;
    output: Avatar;
    descriptionz: Avatar;
    vuforiaID: string;
}
