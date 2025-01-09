import React from "react";
import { BarChart } from "./charts/BarChart";
import { useAcousticnessYear } from "./../hooks/useApi.js";
import { useTrackYears } from "./../hooks/useApi.js";
import LineChart from "./charts/LineChart.jsx";
import BubbleChart from "./charts/BubbleChart.jsx";

export const Dashboard = () => {
  const { data: songs, isLoading } = useAcousticnessYear();
  const { data: content } = songs || {};

  const { data2: songs2, isLoading2 } = useTrackYears();
  const { data2: content2 } = songs || {};

  console.log(content2);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex">
      <LineChart
        content={content.average_acousticness}
        title="Average acousticness by year"
        label="From 0 to 1"
      />

      <h2>Bubble chart</h2>

      <BubbleChart
        content={content.result}
        title="Tracks by year"
        label="Test"
      />
    </div>
  );
};
