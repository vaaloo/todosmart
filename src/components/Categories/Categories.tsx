import React from "react";
import {CategoriesProps} from "../../types/CategoriesType";
import styles from "./Categories.module.css";
import CategoryItem from "../CategoryItem/CategoryItem";

const Categories: React.FC<CategoriesProps> = ({ data }) => {
    return (
        <div className={styles.categories}>
            {data.categories.map((cat) => (
                <CategoryItem
                    key={cat.id}
                    id={cat.id}
                    title={cat.title}
                    color={cat.color}
                    icon={cat.icon}
                    actif={cat.actif}
                />
            ))}
        </div>
    );
}

export default Categories;