import {
  ApiResult,
  ApiResultPaginated,
  DeformationControl,
  DeformationControlTrend,
  SensorType,
  ThermistorChain,
  ThermistorChainTrend,
} from '../types';

export const MesurementsApi = {
  getMeasurements: async function (
    id: SensorType
  ): Promise<ApiResultPaginated<DeformationControl[] | ThermistorChain[]>> {
    return fetch(`/api/measurements/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  },

  getMeasurementsTrend: async function (
    id: SensorType
  ): Promise<ApiResult<DeformationControlTrend | ThermistorChainTrend>> {
    return fetch(`/api/measurements/trend/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  },
};
