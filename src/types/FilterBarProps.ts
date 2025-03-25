import {FiltersType} from "./FiltersType";

export interface FilterBarProps {
    data: {
        taches: any[];
        categories: any[];
        relations: { tache: number; categorie: number }[];
    };
    onFilterChange: (filters: FiltersType) => void;
}

export {};