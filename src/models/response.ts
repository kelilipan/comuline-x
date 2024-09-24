export type APIResponse<T> = {
  status: number;
  data?: T;
  message?: string;
};
