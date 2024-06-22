import styles from './styles.module.scss';
import { useMeasurements } from '../../hooks/useMeasurements';
import DeformationControlTable from '../DeformationControlTable';
import ThermistorChainTable from '../ThermistorChainTable';

const MesurementsTables = () => {
  const measurements = useMeasurements();

  return (
    <div className={styles.mesurementsContainer}>
      <DeformationControlTable
        tableData={measurements.deformationControlTableData}
        setFilterStartDate={measurements.setDeformationControlFilterStartDate}
        setFilterEndDate={measurements.setDeformationControlFilterEndDate}
      />
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
