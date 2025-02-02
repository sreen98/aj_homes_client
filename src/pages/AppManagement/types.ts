import { IStatusHandler } from 'types';

export interface AppManagementState {
  currentLocale: string;
  mode: 'light' | 'dark';
  loading: boolean;
  error: string;
  userData: any;
  showStatus: boolean;
  status: IStatusHandler;
  siteStatus: boolean;
}
