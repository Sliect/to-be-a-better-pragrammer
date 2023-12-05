import { createContext, useContext } from 'react';

import type { FormInstance } from 'antd/es/form';

interface ISchemaFormContext {
  form?: FormInstance;
  Fields?: Record<string, React.ComponentType<any>>;
  FieldWrap?: React.ComponentType<any>;
}

const SchemaFormContext = createContext<ISchemaFormContext>({});

export const SchemaFormProvider = SchemaFormContext.Provider;

export const useSchemaFormContext = () => {
  return useContext(SchemaFormContext);
};
