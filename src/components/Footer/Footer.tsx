import styles from './Footer.module.css';
import {useActivePage} from "../../context/ActivePageContext";
import {IoCloseSharp} from "react-icons/io5";
import {useEffect, useState} from "react";
import {FooterProps} from "../../types/FooterProps";

function Footer({ onAddTask, onAddCategory, data }: FooterProps) {
    const { activePage, setActivePage } = useActivePage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEtat, setSelectedEtat] = useState("Nouveau");
    const [etatDropdownOpen, setEtatDropdownOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryColor, setCategoryColor] = useState("#ff2600");
    const [categoryIcon, setCategoryIcon] = useState("🔥");
    const [categoryActif, setCategoryActif] = useState(true);
    const [emojiDropdownOpen, setEmojiDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const etatOptions = ["Nouveau", "En cours", "En attente"];
    const emojiOptions = ["🔥", "📈", "📚", "💡", "🎯", "🛒", "🧠", "🧩"];

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
                        {activePage === "Tasks" ? (
                            <>
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

                                    <div className={styles.dropdown} onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
                                        <div className={styles.selected}>
                                            {selectedCategoryId === null ? "Aucune catégorie" : data.categories.find((c) => c.id === selectedCategoryId)?.title || "Inconnue"}
                                        </div>
                                        {categoryDropdownOpen && (
                                            <div className={styles.options}>
                                                <div className={styles.option} onClick={() => {
                                                    setSelectedCategoryId(null);
                                                    setCategoryDropdownOpen(false);
                                                }}>Aucune</div>
                                                {data.categories.map((cat) => (
                                                    <div
                                                        key={cat.id}
                                                        className={styles.option}
                                                        onClick={() => {
                                                            setSelectedCategoryId(cat.id);
                                                            setCategoryDropdownOpen(false);
                                                        }}
                                                    >
                                                        {cat.icon ? `${cat.icon} ` : ""}{cat.title}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

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
                                                categorieId: selectedCategoryId,
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
                                            setSelectedCategoryId(null);
                                        }}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Ajouter une catégorie</h2>
                                <div className={styles.form}>
                                    <input type="text" placeholder="Nom de la catégorie" value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} />
                                    <div className={styles.colorRow}>
                                        <label htmlFor="color">Couleur :</label>
                                        <input type="color" id="color" value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)} />
                                    </div>
                                    <div className={styles.emojiRow}>
                                        <label>Emoji :</label>
                                        <div className={styles.dropdown} onClick={() => setEmojiDropdownOpen(!emojiDropdownOpen)}>
                                            <div className={styles.selected}>{categoryIcon}</div>
                                            {emojiDropdownOpen && (
                                                <div className={styles.options}>
                                                    {emojiOptions.map((emoji) => (
                                                        <div
                                                            key={emoji}
                                                            className={`${styles.option} ${categoryIcon === emoji ? styles.active : ""}`}
                                                            onClick={() => {
                                                                setCategoryIcon(emoji);
                                                                setEmojiDropdownOpen(false);
                                                            }}
                                                        >
                                                            {emoji}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <label className={styles.checkbox}>
                                        <input type="checkbox" checked={categoryActif} onChange={(e) => setCategoryActif(e.target.checked)} />
                                        Actif
                                    </label>
                                    <button
                                        onClick={() => {
                                            if (categoryTitle.trim().length < 3) {
                                                return alert("Intitulé de 3 caractères minimum");
                                            }
                                            const newCategory = {
                                                id: Date.now(),
                                                title: categoryTitle,
                                                color: categoryColor,
                                                icon: categoryIcon,
                                                actif: categoryActif,
                                            };
                                            onAddCategory(newCategory);
                                            setIsModalOpen(false);
                                            setCategoryTitle("");
                                            setCategoryColor("#ff2600");
                                            setCategoryIcon("🔥");
                                            setCategoryActif(true);
                                        }}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </>
                        )}
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