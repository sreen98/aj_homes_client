import { Store } from 'redux';
import { Saga } from '@redux-saga/types';

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga | (() => IterableIterator<any>) | undefined, args: any | undefined): any;
}

export declare interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export interface IObject {
  [key: string]: string;
}
export interface RequestSagaParams {
  type: string;
  payload: any;
  meta?: any;
  error?: any;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export interface IStatusHandler {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export interface IProperty {
  _id: string;
  title: string;
  images: string[];
  reference: string;
  postcode: string;
  description: string;
  area: number;
  floor: number;
  bathroom: number;
  bedroom: number;
  tenure: string;
  furnishingType: string;
  lettingType: string;
  minTerm: string;
  contractLength: string;
  deposit: string;
  price: string;
  payable: string;
  type: string;
  status: string;
  ytLink: string;
  mapLink: string;
  address: string;
}
