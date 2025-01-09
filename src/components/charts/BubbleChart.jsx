import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = () => {
  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 10, r: 10 },
          { x: 25, y: 18, r: 20 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return <Bubble data={data} options={options} />;
};

export default BubbleChart;
