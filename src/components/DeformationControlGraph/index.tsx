import Plot from 'react-plotly.js';
import { DeformationControl, DeformationControlTrend } from '../../types';
import moment from 'moment';
import { PlotData } from 'plotly.js';

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
      x: x,
      y: deltaArray,
      name: 'Δ',
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    } as PlotData,
    {
      x: trendX,
      y: trendY,
      name: 'Тренд Δ',
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: 'red',
      },
    } as PlotData,
  ];

  if (sortedTableData.length) {
    const maxTableDataDate = moment(
      sortedTableData[sortedTableData.length - 1].time
    ).toDate();
    const maxTrendDate = trendX[trendX.length - 1];
    const maxDate =
      maxTableDataDate > maxTrendDate ? maxTableDataDate : maxTrendDate;

    const minDeltaX = [moment(sortedTableData[0].time).toDate(), maxDate];
    const minDeltaY = Array(2).fill(-sortedTableData[0].criticalDelta);

    const maxDeltaX = [
      moment(sortedTableData[sortedTableData.length - 1].time).toDate(),
      maxDate,
    ];
    const maxDeltaY = Array(2).fill(sortedTableData[0].criticalDelta);

    scatters.push(
      ...[
        {
          x: Array(2).fill(trendX[trendX.length - 1]),
          y: [trendY[trendY.length - 1], minDeltaY[0] || 0], // 0 as fallback in case no data available during filtering
          name: 'Конец эксплуатации',
          type: 'scatter',
          mode: 'lines',
          line: {
            color: 'black',
          },
        } as PlotData,
        {
          x: maxDeltaX,
          y: maxDeltaY,
          name: 'Макс. Δ, м',
          type: 'scatter',
          mode: 'lines',
          line: {
            dash: 'dash',
            color: 'orange',
          },
        } as PlotData,
        {
          x: minDeltaX,
          y: minDeltaY,
          name: 'Мин. Δ, м',
          type: 'scatter',
          mode: 'lines',
          marker: { color: 'red' },
          line: {
            dash: 'dash',
            color: 'green',
          },
        } as PlotData,
      ]
    );
  }

  return (
    <div>
      <Plot
        data={scatters}
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
