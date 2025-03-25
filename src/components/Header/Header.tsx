import styles from './Header.module.css';
import PieChart from "../PieChart/PieChart";
import { HeaderProps } from "../../types/HeaderProps";

function Header({ encours, data }: HeaderProps) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.tasks}>
                    <h2>{encours} taches</h2>
                </div>
                <div className={styles.chart}>
                    <PieChart data={data} />
                </div>
            </header>
        </>
    )
}

export default Header;