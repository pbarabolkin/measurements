import { http, HttpResponse } from 'msw';
import { SensorType } from '../types';
import deformationResponse from './mockData/deformation_response.json';
import deformationTrendResponse from './mockData/deformation_trend_response.json';
import termoResponse from './mockData/termo_response.json';
import termoTrendResponse from './mockData/termo_trend_response.json';

export const handlers = [
  http.get('/api/measurements/:id', ({ params }) => {
    const id = params.id;
    let response;

    switch (id) {
      case SensorType.DeformationControl:
        response = deformationResponse;
        break;
      case SensorType.ThermistorChain:
        response = termoResponse;
        break;
      default:
        throw new Error(`Invalid SensorType: "${id}"`);
    }

    return HttpResponse.json(response);
  }),
  http.get('/api/measurements/trend/:id', ({ params }) => {
    const id = params.id;
    let response;

    switch (id) {
      case SensorType.DeformationControl:
        response = deformationTrendResponse;
        break;
      case SensorType.ThermistorChain:
        response = termoTrendResponse;
        break;
      default:
        throw new Error(`Invalid SensorType: "${id}"`);
    }

    return HttpResponse.json(response);
  }),
];
