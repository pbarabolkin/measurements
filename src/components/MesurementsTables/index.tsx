import { useEffect, useState } from 'react';
import { MesurementsApi } from '../../apis/mesurementsApi';
import {
  ApiResult,
  ApiResultPaginated,
  DeformationControl,
  DeformationControlTrend,
  SensorType,
  ThermistorChain,
  ThermistorChainTrend,
} from '../../types';

const MesurementsTables = () => {
  const [deformationControlResponse, setDeformationControlResponse] =
    useState<ApiResultPaginated<DeformationControl[]>>();
  const [thermistorChainResponse, setThermistorChainResponse] =
    useState<ApiResultPaginated<ThermistorChain[]>>();
  const [deformationControlTrendResponse, setDeformationControlTrendResponse] =
    useState<ApiResult<DeformationControlTrend>>();
  const [thermistorChainTrendResponse, setThermistorChainTrendResponse] =
    useState<ApiResult<ThermistorChainTrend>>();

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

  return (
    <div>
      {deformationControlResponse?.data.length} <br />
      {thermistorChainResponse?.data.length} <br />
      {deformationControlTrendResponse?.data.criticalEndDate} <br />
      {thermistorChainTrendResponse?.data.criticalEndDate} <br />
    </div>
  );
};

export default MesurementsTables;
