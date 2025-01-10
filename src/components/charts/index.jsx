import BarChart from './BarChart';
import LineChart from './LineChart';
import HeatmapChart from './HeatmapChart';
import CurvedLineChart from './CurvedLineChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';

import List from './ListChart';

const Chart = ({
  chartType,
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  labels,
  colors,
  title,
  expanded,
  variant = ""
}) => {

  if (chartType === "lineChart") return (
    <LineChart 
      data={Object.entries(data?.songsByYear || {}).map(([year, count]) => ({
      year: parseInt(year),
      count: count
      }))} 
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel}/>
  )
  if (chartType === "barChart") return (
    <BarChart 
      data={Object.entries(data.popularity_per_language).map(([key, value]) => ({
        [xKey]: key || 'Inconnu',
        [yKey]: Math.round(value)
      }))} 
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel}
    />
  )
  if (chartType === "heatmapChart") return (
    <HeatmapChart data={data.data} xLabel={xLabel} yLabel={yLabel} maxDensity={data.maxDensity}/>
  )
  if (chartType === "curvedLineChart") return (
    <CurvedLineChart 
      data={Object.entries(acousticnessData?.average_acousticness || {}).map(([year, value]) => ({
      year: parseInt(year),
      acousticness: value,
      danceability: danceabilityData?.average_danceability[year] || 0
      }))}
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel} labels={labels}
  />
  )
  if (chartType === "list") return (
    <List data={data} xKey={xKey} xLabel={xLabel}/>
  )
  if (chartType === "pie") return (
    <PieChart 
      data={Object.entries(data.items).map(([key, value]) => ({
      label: key,
      value: value
    }))} 
      colors={colors}
      title={title}
    />
  )
  if (chartType === "doughnut") return (
    <DoughnutChart 
      data={Object.entries(data.items).map(([key, value]) => ({
      label: key,
      value: value
    }))} 
      colors={colors}
      title={title}
    />
  )

  else return <div>Non</div>
}

export default Chart
