export interface FooterProps {
    onAddTask: (task: any) => void;
    onAddCategory: (category: any) => void;
    data: {
        taches: any[];
        categories: any[];
        relations: { tache: number; categorie: number }[];
    };
}