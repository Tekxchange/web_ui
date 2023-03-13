export type ErrorsOf<T extends object> = {
  [key in keyof T]: string;
};
