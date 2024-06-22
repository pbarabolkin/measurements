export enum SensorType {
  ThermistorChain = 'ThermistorChain',
  DeformationControl = 'DeformationControl',
}

export interface DeformationControlSensorData {
  value: number;
  isValid: boolean;
  delta: number;
}

export interface DeformationControl {
  time: string;
  objectId: string;
  sensorType: SensorType;
  status: boolean;
  data: DeformationControlSensorData;
  state: string;
  criticalDelta: number;
}

export interface ThermistorChainSensorData {
  [key: number]: {
    value: number;
    isValid: boolean;
  };
}

export interface ThermistorChain {
  time: string;
  objectId: string;
  sensorType: SensorType;
  status: boolean;
  data: ThermistorChainSensorData;
  state: string;
  criticalTemperature: number;
  minDepth: number;
  maxDepth: number;
  averageTemperature: number;
}

export interface TrendPoints {
  [key: string]: number;
}

export interface DeformationControlTrend {
  objectId: string;
  points: TrendPoints;
  startDate: string;
  endDate: string;
  criticalEndDate: string;
}

export interface ThermistorChainTrend {
  points: TrendPoints;
  startDate: string;
  criticalEndDate: string;
}

export interface ApiResult<T = any> {
  data: T;
  succeeded: boolean;
  errors: string[];
}

export interface ApiResultPaginated<T = any> extends ApiResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
