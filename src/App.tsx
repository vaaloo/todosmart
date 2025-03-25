import './App.module.css';
import Header from "./components/Header/Header";
import { useState } from "react";
import { loadJsonFile } from "./utils/fileLoader";
import Footer from "./components/Footer/Footer";
import styles from './App.module.css';
import Tasks from "./components/Tasks/Tasks";
import {useActivePage} from "./context/ActivePageContext";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<any>({ taches: [], categories: [], relations: [] });
    const {activePage} = useActivePage();

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

    const startFromScratch = () => {
        setIsLoaded(true);
    };

    if (!isLoaded) {
        return (
            <>
                <input type="file" accept="application/json" onChange={handleFileUpload} />
                <button onClick={startFromScratch}>Partir de zéro</button>
            </>
        );
    }

    const tachesEnCours = data.taches.filter((t: any) => t.etat !== "Reussi" && t.etat !== "Abandonne").length;

    return (
        <>
            <section className={styles.app}>
                <Header encours={tachesEnCours} data={data}/>
                {
                    data && activePage === "Tasks" ? (
                        <div className={styles.scrollableTasks}>
                            <Tasks data={data} onEtatChange={handleEtatChange} />
                        </div>
                    ) : null
                }
                <Footer onAddTask={handleAddTask} />
            </section>
        </>
    );
}

export default App;