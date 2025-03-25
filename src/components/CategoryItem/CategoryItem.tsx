import styles from './CategoryItem.module.css';
import {CategoryItemProps} from "../../types/CategoryItemsProps";

const CategoryItem = ({ title, color, icon, actif }: CategoryItemProps) => {
    return (
        <div className={`${styles.item} ${!actif ? styles.inactive : ""}`}>
            <div className={styles.cardHeader}>
                <span className={styles.icon}>{icon}</span>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.meta}>
                <div className={styles.colorPreview} style={{ backgroundColor: color }} />
                <span className={styles.colorCode}>{color}</span>
                <span className={styles.status}>{actif ? "Actif" : "Inactif"}</span>
            </div>
        </div>
    );
};

export default CategoryItem;