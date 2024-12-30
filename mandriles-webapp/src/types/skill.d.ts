export interface Skill {
    id: number;
    name: string;
    power: number;
    mandrilId: number;
}

export enum EPower {
    Soft = 0,
    Moderate = 1,
    Intense = 2,
    Powerful = 3,
    Extreme = 4
}