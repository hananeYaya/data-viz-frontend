import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const DoughnutChart = ({
  data,
  title,
  colors = ['#1ed760', '#1fdf6f', '#d14f21', '#b10f2e'], // Couleurs par défaut
  expanded = false
}) => {
  const chartRef = React.useRef(null);

  // Options de configuration du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#ffffff',
        font: {
          size: expanded ? 18 : 14,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(36, 36, 36, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw.toLocaleString();
            return label;
          }
        }
      }
    }
  };

  // Préparation des données pour le graphique
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colors,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        hoverBackgroundColor: colors.map(color => color + 'b0')
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: expanded ? '100%' : '300px' }}>
      <Doughnut ref={chartRef} options={options} data={chartData} />
    </div>
  );
};

export default DoughnutChart;
