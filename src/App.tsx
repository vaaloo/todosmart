import './App.module.css';
import Header from "./components/Header/Header";
import { useState } from "react";
import { loadJsonFile } from "./utils/fileLoader";
import Footer from "./components/Footer/Footer";
import styles from './App.module.css';
import Tasks from "./components/Tasks/Tasks";
import {useActivePage} from "./context/ActivePageContext";
import {FiltersType} from "./types/FiltersType";
import Categories from "./components/Categories/Categories";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<{ taches: any[]; categories: any[]; relations: { tache: number; categorie: number }[] }>({ taches: [], categories: [], relations: [] });
    const {activePage} = useActivePage();
    const [filters, setFilters] = useState<FiltersType>({
        sortBy: "title",
        categories: [],
        etats: [],
        urgent: "all",
        done: "all"
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        loadJsonFile(file, (json) => {
            setData(json);
            setIsLoaded(true);
        });
    };

    const handleEtatChange = (id: number, newEtat: string) => {
        const newData = {
            ...data,
            taches: data.taches.map((t: any) =>
                t.id === id ? { ...t, etat: newEtat } : t
            ),
        };
        setData(newData);
    };

    const handleAddTask = (newTask: any) => {
        setData((prevData: any) => ({
            ...prevData,
            taches: [...prevData.taches, newTask]
        }));
    };

    const handleAddCategory = (newCategory: any) => {
        setData((prevData: any) => ({
            ...prevData,
            categories: [...prevData.categories, newCategory],
        }));
    };

    const startFromScratch = () => {
        setIsLoaded(true);
    };

    if (!isLoaded) {
        return (
            <div className={styles.loadingScreen}>
                <h1 className={styles.title}>Bienvenue dans TodoSmart</h1>
                <p className={styles.subtitle}>Commencez en important un fichier JSON ou partez de zéro</p>
                <div className={styles.actions}>
                    <input type="file" accept="application/json" onChange={handleFileUpload} id="jsonUpload" className={styles.fileInput} />
                    <label htmlFor="jsonUpload" className={styles.fileLabel}>Importer un fichier JSON</label>
                    <button className={styles.startButton} onClick={startFromScratch}>Partir de zéro</button>
                </div>
            </div>
        );
    }

    const tachesEnCours = data.taches.filter((t: any) => t.etat !== "Reussi" && t.etat !== "Abandonne").length;

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
            <section className={styles.app}>
                <Header encours={tachesEnCours} data={data}/>
                {
                    data && activePage === "Tasks" ? (
                        <div className={styles.scrollableTasks}>
                            <Tasks data={data} onEtatChange={handleEtatChange} />
                        </div>
                    ) : data && activePage === "Category" ? (
                        <div className={styles.scrollableTasks}>
                            <Categories data={data} />
                        </div>
                    ) : null
                }
                <Footer onAddTask={handleAddTask} onAddCategory={handleAddCategory} data={data}/>
            </section>
        </>
    );
}

export default App;