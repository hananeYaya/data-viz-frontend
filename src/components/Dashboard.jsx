import React from 'react';
import { useAcousticnessYear, useTop10Danceable } from './../hooks/useApi.js';
import LineChart from './charts/LineChart.jsx';
import List from './charts/list/List.jsx';

import styles from "./index.module.css"

export const Dashboard = () => {
  const getData = (useDataHook) => {
    const { data: content, isLoading } = useDataHook();
    const { data: songs } = content || {};
    const { results } = songs || {};
    
    return { results, isLoading };
  }

  return (
    <div className={styles.root}>
      <h1>Best Spotify dashboard ever</h1>
      <LineChart content={getData(useAcousticnessYear)} title="Average acousticness by year" label="From 0 to 1"/>
      <List content={getData(useTop10Danceable)} title="Top 10 of the most danceable tracks"/>
    </div>
  );
};
