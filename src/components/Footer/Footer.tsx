import styles from './Footer.module.css';
import {useActivePage} from "../../context/ActivePageContext";
import {IoCloseSharp} from "react-icons/io5";
import {useEffect, useState} from "react";
import {FooterProps} from "../../types/FooterProps";

function Footer({ onAddTask }: FooterProps) {
    const { activePage, setActivePage } = useActivePage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEtat, setSelectedEtat] = useState("Nouveau");
    const [etatDropdownOpen, setEtatDropdownOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgent, setUrgent] = useState(false);
    const etatOptions = ["Nouveau", "En cours", "En attente"];

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    }, [isModalOpen]);

    return (
        <>
            {isModalOpen && (<div className={styles.backdrop}></div>)}
            {isModalOpen && (
                <div className={styles.modal}>
                    {/* @ts-ignore */}
                    <IoCloseSharp className={styles.close} onClick={() => setIsModalOpen(false)}/>
                    <div className={styles.content}>
                        <h2>Ajouter une tâche</h2>
                        <div className={styles.form}>
                            <input id="title" type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>

                            <div className={styles.dropdown} onClick={() => setEtatDropdownOpen(!etatDropdownOpen)}>
                                <div className={styles.selected}>{selectedEtat}</div>
                                {etatDropdownOpen && (
                                    <div className={styles.options}>
                                        {etatOptions.map((etat) => (
                                            <div
                                                key={etat}
                                                className={styles.option}
                                                onClick={() => {
                                                    setSelectedEtat(etat);
                                                    setEtatDropdownOpen(false);
                                                }}
                                            >
                                                {etat}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input type="date" id="date" name="date" />

                            <label className={styles.checkbox}>
                                <input id="urgent" type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
                                Urgente
                            </label>

                            <button
                                onClick={() => {
                                    const now = new Date().toISOString().split("T")[0];
                                    const nowPlus7 = new Date().setDate(new Date().getDate() + 7);
                                    const echeance = (document.getElementById("date") as HTMLInputElement).value;
                                    const titleEl = document.getElementById("title") as HTMLInputElement;
                                    const newTask = {
                                        id: Date.now(),
                                        title,
                                        description,
                                        date_creation: now,
                                        date_echeance: echeance === "" ? now : echeance,
                                        etat: selectedEtat,
                                        urgent,
                                    };
                                    if (title === "") {
                                        titleEl.focus();
                                        return;
                                    }
                                    onAddTask(newTask);
                                    setIsModalOpen(false);
                                    setTitle("");
                                    setDescription("");
                                    setUrgent(false);
                                    setSelectedEtat("Nouveau");
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <footer className={styles.footer}>
                <div className={styles.add}>
                    <button onClick={() => setIsModalOpen(true)}>Ajouter</button>
                </div>
                <div className={styles.double}>
                    <div className={styles.tasks}>
                        <button className={activePage === "Tasks" ? styles.active : ""}
                                onClick={() => setActivePage("Tasks")}>Tâches
                        </button>
                    </div>
                    <div className={styles.categories}>
                        <button className={activePage === "Category" ? styles.active : ""}
                                onClick={() => setActivePage("Category")}>Catégories
                        </button>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;