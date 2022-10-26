import { ModelDetails } from './modelDetails';

export interface Model {
    id: number;
    title: string;
    src: string;
    isSelected: boolean;
    types?: ModelDetails[];
}