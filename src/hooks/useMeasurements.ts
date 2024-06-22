import { useEffect, useState } from 'react';
import {
  ApiResult,
  ApiResultPaginated,
  DeformationControl,
  DeformationControlTrend,
  SensorType,
  ThermistorChain,
  ThermistorChainTrend,
} from '../types';
import { MesurementsApi } from '../apis/mesurementsApi';
import moment from 'moment';

export const useMeasurements = () => {
  const [deformationControlResponse, setDeformationControlResponse] =
    useState<ApiResultPaginated<DeformationControl[]>>();
  const [thermistorChainResponse, setThermistorChainResponse] =
    useState<ApiResultPaginated<ThermistorChain[]>>();
  const [deformationControlTrendResponse, setDeformationControlTrendResponse] =
    useState<ApiResult<DeformationControlTrend>>();
  const [thermistorChainTrendResponse, setThermistorChainTrendResponse] =
    useState<ApiResult<ThermistorChainTrend>>();

  const [
    deformationControlFilterStartDate,
    setDeformationControlFilterStartDate,
  ] = useState<string>();
  const [deformationControlFilterEndDate, setDeformationControlFilterEndDate] =
    useState<string>();
  const [deformationControlTableData, setDeformationControlTableData] =
    useState<DeformationControl[]>([]);

  const [thermistorChainFilterStartDate, setThermistorChainFilterStartDate] =
    useState<string>();
  const [thermistorChainFilterEndDate, setThermistorChainFilterEndDate] =
    useState<string>();
  const [thermistorChainTableData, setThermistorChainTableData] = useState<
    ThermistorChain[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const dcResponse = (await MesurementsApi.getMeasurements(
        SensorType.DeformationControl
      )) as ApiResultPaginated<DeformationControl[]>;

      const tcResponse = (await MesurementsApi.getMeasurements(
        SensorType.ThermistorChain
      )) as ApiResultPaginated<ThermistorChain[]>;

      const dctResponse = (await MesurementsApi.getMeasurementsTrend(
        SensorType.DeformationControl
      )) as ApiResult<DeformationControlTrend>;

      const tctResponse = (await MesurementsApi.getMeasurementsTrend(
        SensorType.ThermistorChain
      )) as ApiResult<ThermistorChainTrend>;

      setDeformationControlResponse(dcResponse);
      setThermistorChainResponse(tcResponse);
      setDeformationControlTrendResponse(dctResponse);
      setThermistorChainTrendResponse(tctResponse);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (deformationControlResponse) {
      const filteredData = deformationControlResponse.data.filter((item) => {
        const startDateSucceed =
          !deformationControlFilterStartDate ||
          moment(item.time) >= moment(deformationControlFilterStartDate);
        const endDateSucceed =
          !deformationControlFilterEndDate ||
          moment(item.time) <= moment(deformationControlFilterEndDate);

        return startDateSucceed && endDateSucceed;
      });

      setDeformationControlTableData(filteredData);
    }
  }, [
    deformationControlResponse,
    deformationControlFilterStartDate,
    deformationControlFilterEndDate,
  ]);

  useEffect(() => {
    if (thermistorChainResponse) {
      const filteredData = thermistorChainResponse.data.filter((item) => {
        const startDateSucceed =
          !thermistorChainFilterStartDate ||
          moment(item.time) >= moment(thermistorChainFilterStartDate);
        const endDateSucceed =
          !thermistorChainFilterEndDate ||
          moment(item.time) <= moment(thermistorChainFilterEndDate);

        return startDateSucceed && endDateSucceed;
      });

      setThermistorChainTableData(filteredData);
    }
  }, [
    thermistorChainResponse,
    thermistorChainFilterStartDate,
    thermistorChainFilterEndDate,
  ]);

  return {
    deformationControlTableData,
    setDeformationControlFilterStartDate,
    setDeformationControlFilterEndDate,
    thermistorChainTableData,
    setThermistorChainFilterStartDate,
    setThermistorChainFilterEndDate,
  };
};
