import TaskItem from "../TaskItem/TaskItem";
import styles from "./Tasks.module.css";
import {useState} from "react";
import { TasksProps } from "../../types/TasksProps";
import FilterBar from "../FilterBar/FilterBar";
import {FiltersType} from "../../types/FiltersType";

const Tasks: React.FC<TasksProps> = ({ data, onEtatChange }) => {
    const [filters, setFilters] = useState<FiltersType>({
        sortBy: "title",
        categories: [],
        etats: [],
        urgent: "all",
        done: "all"
    });

    let filtered = [...data.taches];

    if (filters.categories.length > 0) {
        const relatedTaskIds = data.relations
            .filter((rel: any) => filters.categories.includes(rel.categorie.toString()))
            .map((rel: any) => rel.tache);
        filtered = filtered.filter((t: any) => relatedTaskIds.includes(t.id));
    }

    if (filters.etats.length > 0) {
        filtered = filtered.filter((t: any) => filters.etats.includes(t.etat));
    }

    if (filters.urgent !== "all") {
        filtered = filtered.filter((t: any) => t.urgent === (filters.urgent === "true"));
    }

    if (filters.done !== "all") {
        filtered = filtered.filter((t: any) =>
            filters.done === "done"
                ? t.etat === "Reussi"
                : t.etat !== "Reussi" && t.etat !== "Abandonne"
        );
    }

    filtered.sort((a, b) => {
        if (filters.sortBy === "title") return a.title.localeCompare(b.title);
        if (filters.sortBy === "date_creation") return a.date_creation.localeCompare(b.date_creation);
        if (filters.sortBy === "date_echeance") return a.date_echeance.localeCompare(b.date_echeance);
        return 0;
    });

    return (
        <>
            <FilterBar data={data} onFilterChange={setFilters} />
            <div className={`${styles.tasks} ${styles.scrollableTasks}`}>
                {filtered.map((task: any) => (
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
        </>
    );
};

export default Tasks;