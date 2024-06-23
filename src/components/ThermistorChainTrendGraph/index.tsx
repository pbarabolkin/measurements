import Plot from 'react-plotly.js';
import { ThermistorChainTrend, ThermistorChain } from '../../types';
import moment from 'moment';
import { PlotData } from 'plotly.js';

const ThermistorChainTrendGraph = ({
  tableData,
  trendTableData,
}: {
  tableData: ThermistorChain[];
  trendTableData: ThermistorChainTrend;
}) => {
  const sortedTableData = tableData.sort((a, b) => {
    const aVal = moment(a.time);
    const bVal = moment(b.time);
    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    }

    return 0;
  });

  const trendX: Date[] = [];
  const trendY: number[] = [];

  Object.keys(trendTableData.points)
    .sort((a, b) => {
      const aVal = moment(a);
      const bVal = moment(b);
      if (aVal < bVal) {
        return -1;
      } else if (aVal > bVal) {
        return 1;
      }

      return 0;
    })
    .forEach((item) => {
      trendX.push(moment(item).toDate());
      trendY.push(trendTableData.points[item]);
    });

  const scatters = [
    {
      x: trendX,
      y: trendY,
      name: 'Тренд Tₑ',
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: 'red',
      },
    } as PlotData,
  ];

  const averageTemperatureX: Date[] = [];
  const averageTemperatureY: number[] = [];

  sortedTableData.forEach((item) => {
    averageTemperatureX.push(moment(item.time).toDate());
    averageTemperatureY.push(item.averageTemperature);
  });

  scatters.push({
    x: averageTemperatureX,
    y: averageTemperatureY,
    name: 'Tₑ, °C',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'blue',
    },
  } as PlotData);

  if (sortedTableData.length) {
    const maxTableDataDate = moment(
      sortedTableData[sortedTableData.length - 1].time
    ).toDate();
    const maxTrendDate = trendX[trendX.length - 1];
    const criticalTemperatureXMax =
      maxTableDataDate > maxTrendDate ? maxTableDataDate : maxTrendDate;

    const criticalTemperatureX = [
      moment(sortedTableData[0].time).toDate(),
      criticalTemperatureXMax,
    ];

    const criticalTemperatureY = Array(2).fill(
      sortedTableData[0].criticalTemperature
    );

    scatters.push({
      x: criticalTemperatureX,
      y: criticalTemperatureY,
      name: 'Tₑ max, °C',
      type: 'scatter',
      mode: 'lines',
      line: {
        dash: 'dash',
        color: 'orange',
      },
    } as PlotData);
  }

  return (
    <div>
      <Plot
        data={scatters}
        layout={{
          width: 900,
          height: 500,
          title: 'Thermistor Chain Trend Graph',
          xaxis: {
            title: 'Дата',
          },
          yaxis: {
            title: 'Температура, °C',
          },
        }}
      />
    </div>
  );
};

export default ThermistorChainTrendGraph;
