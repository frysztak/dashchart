export enum IOStatus {
  OK = 'OK',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface IOState {
  state: IOStatus;
  errorMessage?: string;
}
