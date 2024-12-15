export interface IItem {
    value: string;
    key: number;
    state: boolean;
}

export enum FilterType {
    All = 'All',
    Completed = 'Completed',
    Active = 'Active',
}