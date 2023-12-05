export type Route = {
  key: string;
  path: string;
  target?: string;
  wrappers?: string[];
  component?: string;
  menu?: boolean;
  title?: string;
  icon?: string;
  routes?: Route[];
};
