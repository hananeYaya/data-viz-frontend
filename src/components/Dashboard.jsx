import React from "react";
import {
  useAcousticnessYear,
  useTop10Danceable,
  useDanceabilityPerYear,
  useTrackYears,
} from "./../hooks/useApi.js";
import LineChart from "./charts/lineChart/LineChart.jsx";
import BarChart from "./charts/BarChart.jsx";
import List from "./charts/list/List.jsx";
import BubbleChart from "./charts/BubbleChart.jsx";

import styles from "./index.module.css";

export const Dashboard = () => {
  const getData = (useDataHook) => {
    const { data: content, isLoading } = useDataHook();
    const { data: songs } = content || {};
    const { results } = songs || {};

    return { results, isLoading };
  };

  return (
    <div className={styles.root}>
      <h1>Spotify dashboard more or less aproximative</h1>
      <BarChart
        content={getData(useDanceabilityPerYear)}
        title="Average acousticness by year"
        label="From 0 to 100%"
      />
      <List
        content={getData(useTop10Danceable)}
        title="Top 10 of the most danceable tracks"
      />
      <LineChart
        content={getData(useAcousticnessYear)}
        title="Average acousticness by year"
        label="From 0 to 100%"
      />
    </div>
  );
};
