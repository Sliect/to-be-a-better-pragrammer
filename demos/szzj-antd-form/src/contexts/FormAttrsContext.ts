import { createContext, useContext } from 'react';
import { FormProps } from '../Form/types';

const FormAttrsContext = createContext<FormProps | undefined>({});

export default FormAttrsContext;

export const FormAttrsContextProvider = FormAttrsContext.Provider;

export const useFormAttrsContext = () => {
  return useContext(FormAttrsContext);
};
