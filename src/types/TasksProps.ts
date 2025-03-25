import {Task} from "./Task";

export interface TasksProps {
    data: { taches: Task[] };
    onEtatChange: (id: number, newEtat: string) => void;
}

export {};