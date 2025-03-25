import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    if (!data || !data.taches) return <p>Aucune donnée disponible</p>;

    const etatCounts = data.taches.reduce((acc, tache) => {
        acc[tache.etat] = (acc[tache.etat] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(etatCounts),
        datasets: [
            {
                data: Object.values(etatCounts),
                backgroundColor: ["#ff2600", "#ff6a40", "#ff9874", "#ffae8f", "#ffccba"],
                hoverBackgroundColor: ["#ff2600", "#ff6a40", "#ff9874", "#ffae8f", "#ffccba"],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Pie data={chartData} options={options} />;
};

PieChart.propTypes = {
    data: PropTypes.shape({
        taches: PropTypes.array.isRequired,
    }).isRequired,
};

export default PieChart;