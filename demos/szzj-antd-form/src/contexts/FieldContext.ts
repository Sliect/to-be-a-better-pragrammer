import { createContext, useContext } from 'react';
import { FormItemProps } from 'antd/es/form';

const FieldContext = createContext<FormItemProps | undefined>(undefined);

export default FieldContext;

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = () => {
  return useContext(FieldContext);
};
