import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import styles from "./lineChart/index.module.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BarChart = ({ content, title, label }) => {
  const { results, isLoading } = content;
  if (isLoading) return <div>Loading...</div>;

  const labels = Object.keys(results)
  const values = Object.values(results).map(value => value * 100)

  const data = {
    type: 'bar',
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 20,
        borderSkipped: false
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

  return <Bar className={styles.lineChart} data={data} options={options} />;
};

export default BarChart;
