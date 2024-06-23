import Plot from 'react-plotly.js';
import { ThermistorChain } from '../../types';
import moment from 'moment';
import { PlotData } from 'plotly.js';

const ThermistorChainGraph = ({
  tableData,
}: {
  tableData: ThermistorChain[];
}) => {
  const scatters = tableData.map((item) => {
    const x: number[] = [];
    const y: number[] = [];

    Object.keys(item.data).forEach((key) => {
      x.push(item.data[key as unknown as number].value);
      y.push(+key);
    });

    return {
      x: x,
      y: y,
      name: moment(item.time).format('DD.MM.YYYY HH:mm'),
      type: 'scatter',
      mode: 'lines+markers',
    } as PlotData;
  });

  if (tableData.length) {
    const depthPointsSet = new Set<number>();
    tableData.forEach((item) => {
      Object.keys(item.data).forEach((key) => {
        depthPointsSet.add(+key);
      });
    });
    const depthPointsSorted = Array.from(depthPointsSet).sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }

      return 0;
    });

    const criticalTemperatureX = Array(2).fill(
      tableData[0].criticalTemperature
    );
    const criticalTemperatureY = [
      0,
      depthPointsSorted[depthPointsSorted.length - 1],
    ];

    scatters.push({
      x: criticalTemperatureX,
      y: criticalTemperatureY,
      name: 'Tₑ max, °C',
      type: 'scatter',
      mode: 'lines',
      line: {
        dash: 'dash',
        color: 'red',
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
          title: 'Thermistor Chain Graph',
          xaxis: {
            title: 'Температура, °C',
          },
          yaxis: {
            title: 'Глубина, м',
            autorange: 'reversed',
          },
        }}
      />
    </div>
  );
};

export default ThermistorChainGraph;
