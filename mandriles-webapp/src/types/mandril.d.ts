import { Skill } from './skill';

export interface Mandril {
    id: number;
    firstName: string;
    lastName: string;
    skills: Skill[];
}