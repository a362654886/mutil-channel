import { AxiosResponse } from "axios";

export type GrubResponse<T = unknown> = {
  data: T;
  status: number;
  message: string;
};

export type GrubResponsePromise<T = unknown> = Promise<GrubResponse<T>>;
