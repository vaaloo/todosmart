import TaskItem from "../TaskItem/TaskItem";
import styles from "./Tasks.module.css";
import {useState} from "react";
import { TasksProps } from "../../types/TasksProps";

const Tasks: React.FC<TasksProps> = ({ data, onEtatChange }) => {
    return (
        <div className={`${styles.tasks} ${styles.scrollableTasks}`}>
            {data.taches.map((task: any) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    dateCreation={task.date_creation}
                    dateEcheance={task.date_echeance}
                    etat={task.etat}
                    urgent={task.urgent}
                    onEtatChange={onEtatChange}
                />
            ))}
        </div>
    );
};

export default Tasks;