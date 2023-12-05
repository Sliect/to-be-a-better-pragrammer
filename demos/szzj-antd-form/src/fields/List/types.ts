export type Item = {
  [key: string]: any;
};

export interface ListProps {
  value?: any;
  min?: number;
  max?: number;
  addText?: React.ReactNode;
  transformFieldProps?: (props: any, index: number) => any;
  children: React.ReactElement | React.ReactElement[];
}
