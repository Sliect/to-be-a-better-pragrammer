import { createContext, useContext } from 'react';
import { FormInstance } from 'antd/es/form';

const FormContext = createContext<FormInstance | undefined>(undefined);

export default FormContext;

export const FormContextProvider = FormContext.Provider;

export const useFormContext = () => {
  return useContext(FormContext);
};
