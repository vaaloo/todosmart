import styles from "./FilterBar.module.css";
import {useState, useEffect, JSX} from "react";
import { FaSlidersH, FaSortAlphaDown, FaTags, FaStream, FaBolt, FaCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FiltersType } from "../../types/FiltersType";
import {FilterBarProps} from "../../types/FilterBarProps";

const FilterBar = ({ data, onFilterChange }: FilterBarProps) => {
    const categories = data.categories || [];
    const etats = ["Nouveau", "En cours", "En attente", "Reussi", "Abandonne"];

    const [filters, setFilters] = useState<FiltersType>({
        sortBy: "title",
        categories: [],
        etats: [],
        urgent: "all",
        done: "all"
    });

    const [triDropdown, setTriDropdown] = useState(false);
    const [urgentDropdown, setUrgentDropdown] = useState(false);
    const [doneDropdown, setDoneDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    }, [isModalOpen]);

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const handleCategoryChange = (cat: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat) ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat]
        }));
    };

    const handleEtatChange = (etat: string) => {
        setFilters(prev => ({
            ...prev,
            etats: prev.etats.includes(etat) ? prev.etats.filter(e => e !== etat) : [...prev.etats, etat]
        }));
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className={styles.toggleButton}>
                {/* @ts-ignore */}
                <FaSlidersH className={styles.iconActive} />
            </button>

            {isModalOpen && <div className={styles.backdrop} onClick={() => setIsModalOpen(false)}></div>}

            {isModalOpen && (
                <div className={styles.modal}>
                    {IoCloseSharp({ className: styles.close, onClick: () => setIsModalOpen(false) }) as JSX.Element}
                    <div className={styles.filterBar}>
                        <div className={styles.group}>
                            {/* @ts-ignore */}
                            <label><FaSortAlphaDown /> Tri</label>
                            <div className={styles.dropdown} onClick={() => setTriDropdown(!triDropdown)}>
                                <div className={styles.selected}>{filters.sortBy}</div>
                                {triDropdown && (
                                    <div className={styles.options}>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, sortBy: "title" }))}>Nom</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, sortBy: "date_creation" }))}>Date</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, sortBy: "date_echeance" }))}>Échéance</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.group}>
                            {/* @ts-ignore */}
                            <label><FaTags /> Catégories</label>
                            <div className={styles.multiSelect}>
                                {categories.map((cat: any) => (
                                    <label key={cat.id}>
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(cat.title)}
                                            onChange={() => handleCategoryChange(cat.title)}
                                        />
                                        {cat.title}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.group}>
                            {/* @ts-ignore */}
                            <label><FaStream /> État</label>
                            <div className={styles.multiSelect}>
                                {etats.map((etat) => (
                                    <label key={etat}>
                                        <input
                                            type="checkbox"
                                            checked={filters.etats.includes(etat)}
                                            onChange={() => handleEtatChange(etat)}
                                        />
                                        {etat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.group}>
                            {/* @ts-ignore */}
                            <label><FaBolt /> Urgence</label>
                            <div className={styles.dropdown} onClick={() => setUrgentDropdown(!urgentDropdown)}>
                                <div className={styles.selected}>
                                    {filters.urgent === "all" ? "Toutes" : filters.urgent === "true" ? "Oui" : "Non"}
                                </div>
                                {urgentDropdown && (
                                    <div className={styles.options}>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, urgent: "all" }))}>Toutes</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, urgent: "true" }))}>Oui</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, urgent: "false" }))}>Non</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.group}>
                            {/* @ts-ignore */}
                            <label><FaCheckCircle /> Fait</label>
                            <div className={styles.dropdown} onClick={() => setDoneDropdown(!doneDropdown)}>
                                <div className={styles.selected}>
                                    {filters.done === "all" ? "Toutes" : filters.done === "done" ? "Faites" : "À faire"}
                                </div>
                                {doneDropdown && (
                                    <div className={styles.options}>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, done: "all" }))}>Toutes</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, done: "done" }))}>Faites</div>
                                        <div className={styles.option} onClick={() => setFilters(prev => ({ ...prev, done: "todo" }))}>À faire</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterBar;