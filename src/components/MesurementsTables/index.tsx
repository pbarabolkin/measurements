import styles from './styles.module.scss';
import { useMeasurements } from '../../hooks/useMeasurements';
import DeformationControlTable from '../DeformationControlTable';
import ThermistorChainTable from '../ThermistorChainTable';
import DeformationControlGraph from '../DeformationControlGraph';
import { useState } from 'react';
import ThermistorChainGraph from '../ThermistorChainGraph';
import ThermistorChainTrendGraph from '../ThermistorChainTrendGraph';

const MesurementsTables = () => {
  const measurements = useMeasurements();
  const [deformationControlGraphVisible, setDeformationControlGraphVisible] =
    useState(false);
  const [thermistorChainGraphVisible, setThermistorChainGraphVisible] =
    useState(false);

  const toggleDeformationControlGraphVisibility = () => {
    setDeformationControlGraphVisible(!deformationControlGraphVisible);
  };

  const toggleThermistorChainGraphVisibility = () => {
    setThermistorChainGraphVisible(!thermistorChainGraphVisible);
  };

  return (
    <div className={styles.mesurementsContainer}>
      <DeformationControlTable
        tableData={measurements.deformationControlTableData}
        setFilterStartDate={measurements.setDeformationControlFilterStartDate}
        setFilterEndDate={measurements.setDeformationControlFilterEndDate}
      />
      <br />
      <button onClick={toggleDeformationControlGraphVisibility}>
        {deformationControlGraphVisible ? 'Скрыть график' : 'Показать график'}
      </button>
      <br />
      {measurements.deformationControlTrendResponse &&
        deformationControlGraphVisible && (
          <DeformationControlGraph
            tableData={measurements.deformationControlTableData}
            trendTableData={measurements.deformationControlTrendResponse.data}
          />
        )}
      <br />
      <ThermistorChainTable
        tableData={measurements.thermistorChainTableData}
        setFilterStartDate={measurements.setThermistorChainFilterStartDate}
        setFilterEndDate={measurements.setThermistorChainFilterEndDate}
      />
      <br />
      <br />
      <button onClick={toggleThermistorChainGraphVisibility}>
        {thermistorChainGraphVisible ? 'Скрыть график' : 'Показать график'}
      </button>
      <br />
      {measurements.thermistorChainTrendResponse &&
        thermistorChainGraphVisible && (
          <>
            <ThermistorChainGraph
              tableData={measurements.thermistorChainTableData}
            />
            <br />
            <ThermistorChainTrendGraph
              tableData={measurements.thermistorChainTableData}
              trendTableData={measurements.thermistorChainTrendResponse.data}
            />
          </>
        )}
    </div>
  );
};

export default MesurementsTables;
