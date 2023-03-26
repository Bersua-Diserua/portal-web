export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND: string;
    }
  }

  type TObjUnknown = {
    [key: string]: unknown;
  };

  type TResponse<TObj extends unknown = unknown> = {
    message: string;
    payload: TObj;
  };
}
