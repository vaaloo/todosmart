export interface TaskItemProps {
    id: number;
    title: string;
    description: string;
    dateCreation: string;
    dateEcheance: string;
    etat: string;
    urgent: boolean;
    onEtatChange: (id: number, newEtat: string) => void;
}