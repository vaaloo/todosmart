export interface TasksProps {
    data: {
        taches: any[];
        categories: any[];
        relations: { tache: number; categorie: number }[];
    };
    onEtatChange: (id: number, newEtat: string) => void;
}

export {};