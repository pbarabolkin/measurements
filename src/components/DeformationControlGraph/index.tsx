import Plot from 'react-plotly.js';
import { DeformationControl, DeformationControlTrend } from '../../types';
import moment from 'moment';
import { Datum } from 'plotly.js';

const DeformationControlGraph = ({
  tableData,
  trendTableData,
}: {
  tableData: DeformationControl[];
  trendTableData: DeformationControlTrend;
}) => {
  const sortedTableData = tableData.sort((a, b) => {
    const aVal = a.mesurementCycle;
    const bVal = b.mesurementCycle;
    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    }

    return 0;
  });
  const x = sortedTableData.map((item) => {
    return moment(item.time).toDate();
  });
  const deltaArray = sortedTableData.map((item) => {
    return item.data.delta;
  });

  const minDeltaArray: number[] = [];
  const maxDeltaArray: number[] = [];

  sortedTableData.forEach((item) => {
    minDeltaArray.push(-item.criticalDelta);
    maxDeltaArray.push(item.criticalDelta);
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

  return (
    <div>
      <Plot
        data={[
          {
            x: x,
            y: deltaArray,
            name: 'Δ',
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
          {
            x: trendX,
            y: trendY,
            name: 'Тренд Δ',
            type: 'scatter',
            mode: 'lines+markers',
            line: {
              color: 'red',
            },
          },
          {
            x: Array(2).fill(trendX[trendX.length - 1]),
            y: [trendY[trendY.length - 1], minDeltaArray[0] || 0], // 0 as fallback in case no data available during filtering
            name: 'Конец эксплуатации',
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'black',
            },
          },
          {
            x: x,
            y: maxDeltaArray,
            name: 'Макс. Δ, м',
            type: 'scatter',
            mode: 'lines',
            line: {
              dash: 'dash',
              color: 'orange',
            },
          },
          {
            x: x,
            y: minDeltaArray,
            name: 'Мин. Δ, м',
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'red' },
            line: {
              dash: 'dash',
              color: 'green',
            },
          },
        ]}
        layout={{
          width: 900,
          height: 500,
          title: 'Deformation Control Graph',
          xaxis: {
            title: 'Дата',
          },
          yaxis: {
            title: 'Смещение (Δ), м',
          },
        }}
      />
    </div>
  );
};

export default DeformationControlGraph;
