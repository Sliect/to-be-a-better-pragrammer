import { createContext, useContext } from 'react';
import Form from '../../Form';
import { FormInstance } from 'antd/es/form';
import type { Field } from '../types';

interface ContextType {
  fieldsShouldBindChange: Field[];
}

export const InternalFormContext = createContext<ContextType | undefined>(undefined);

export const { Provider } = InternalFormContext;

const useForm = () => {
  const [form] = Form.useForm();
  const context = useContext(InternalFormContext);
  const fieldsShouldBindChange = context?.fieldsShouldBindChange || [];

  return [
    {
      // @ts-ignore
      __powerBySzzjSchemaForm: true,
      ...form,
      setFields: (flds: any[]) => {
        form.setFields(flds);
        fieldsShouldBindChange.forEach((field) => {
          const found = flds.find((fe) => fe.name === field.name);
          if (found) {
            field.onChange(found.value);
          }
        });
      },
      /**
       * 赋值联动
       * @param values
       */
      setFieldsValue: (values: any) => {
        form.setFieldsValue(values);
        fieldsShouldBindChange.forEach((field) => {
          if (values[field.name] !== undefined) {
            field.onChange(values[field.name]);
          }
        });
      },
    },
  ] as FormInstance[];
};

export default useForm;
