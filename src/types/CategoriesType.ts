export interface CategoriesProps {
    data: {
        taches: any[];
        categories: any[];
        relations: { tache: number; categorie: number }[];
    };
}