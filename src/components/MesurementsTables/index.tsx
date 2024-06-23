import styles from './styles.module.scss';
import { useMeasurements } from '../../hooks/useMeasurements';
import DeformationControlTable from '../DeformationControlTable';
import ThermistorChainTable from '../ThermistorChainTable';
import DeformationControlGraph from '../DeformationControlGraph';
import { useState } from 'react';

const MesurementsTables = () => {
  const measurements = useMeasurements();
  const [deformationControlGraphVisible, setDeformationControlGraphVisible] =
    useState(false);

  const toggleDeformationControlGraphVisibility = () => {
    setDeformationControlGraphVisible(!deformationControlGraphVisible);
  };

  return (
    <div className={styles.mesurementsContainer}>
      <DeformationControlTable
        tableData={measurements.deformationControlTableData}
        setFilterStartDate={measurements.setDeformationControlFilterStartDate}
        setFilterEndDate={measurements.setDeformationControlFilterEndDate}
      />
      <br />
      <button onClick={toggleDeformationControlGraphVisibility}>График</button>
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
    </div>
  );
};

export default MesurementsTables;
