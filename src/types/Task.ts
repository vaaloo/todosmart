export interface Task {
    id: number;
    title: string;
    description: string;
    date_creation: string;
    date_echeance: string;
    etat: string;
    urgent: boolean;
}