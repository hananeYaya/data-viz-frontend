import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import styles from "./index.module.css"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChart = ({ content, title, label }) => {
  const { results, isLoading } = content;
  if (isLoading) return <div>Loading...</div>;

  const labels = Object.keys(results)
  const values = Object.values(results).map(value => value * 100)

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        borderColor: 'rgb(65, 155, 75)',
        backgroundColor: 'rgba(255, 255, 255)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'end',
      },
      title: {
        display: true,
        text: title,
        color: 'white',
        position: 'top',
        align: 'center',
        font: {
          size: 24, 
          family: 'Arial', 
          weight: 'bold'
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        }
      }
    }
  }

  return <Line className={styles.lineChart} data={data} options={options} />;
};

export default LineChart;
