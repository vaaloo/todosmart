import styles from './TaskItem.module.css';
import { useState } from "react";

interface TaskItemProps {
    id: number;
    title: string;
    description: string;
    dateCreation: string;
    dateEcheance: string;
    etat: string;
    urgent: boolean;
    onEtatChange: (id: number, newEtat: string) => void;
}

function TaskItem({
                      id,
                      title,
                      description,
                      dateCreation,
                      dateEcheance,
                      etat: initialEtat,
                      urgent,
                      onEtatChange
                  }: TaskItemProps) {
    const [isDeployed, setIsDeployed] = useState(false);
    const [etat, setEtat] = useState(initialEtat);
    const [visible, setVisible] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const etatOptions = ["Nouveau", "En cours", "Reussi", "En attente", "Abandonne"];

    const handleEtatChange = (newEtat: string) => {
        setEtat(newEtat);
        onEtatChange(id, newEtat);
        setDropdownOpen(false);
        if (newEtat === "Reussi") {
        }
    };

    if (!visible) return null;

    return (
        <div onClick={() => setIsDeployed(!isDeployed)} className={`${styles.item} ${urgent ? styles.urgent : ""} ${etat === "Reussi" || etat === "Abandonne" ? styles.reussie : ""} ${dropdownOpen ? styles.zTop : ""}`}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.dropdownSelected} onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {etat}
                    </div>
                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            {etatOptions.map((option) => (
                                <div
                                    key={option}
                                    className={styles.dropdownItem}
                                    onClick={() => handleEtatChange(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <p className={styles.description} style={{ display: isDeployed ? "block" : "none" }}>
                {description}
            </p>
            <div className={styles.cardFooter}>
                <span className={styles.date}>Créée le : {dateCreation}</span>
                <span className={styles.date}>Échéance : {dateEcheance}</span>
            </div>
        </div>
    );
}

export default TaskItem;