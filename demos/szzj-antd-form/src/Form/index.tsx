import React from 'react';
import { Form } from 'antd';
import { FormContextProvider } from '../contexts/FormContext';
import { FormAttrsContextProvider } from '../contexts/FormAttrsContext';
import FormItem from '../FormItem';
import { ClsPrefix } from '../consts';
import './index.less';

import type { FormProps } from './types';

/**
 * 基础表单容器，扩展详情展示功能
 * @param props FormProps
 * @returns
 */
const BaseForm = (props: FormProps) => {
  const { form, children, detail, ...rest } = props;

  return (
    <div className={detail ? `${ClsPrefix}-form-detail` : undefined}>
      <Form form={form} {...rest}>
        <FormContextProvider value={form}>
          <FormAttrsContextProvider value={{ detail, ...rest }}>
            {/* @ts-ignore */}
            {children}
          </FormAttrsContextProvider>
        </FormContextProvider>
      </Form>
    </div>
  );
};

BaseForm.List = Form.List;
BaseForm.Item = FormItem;
BaseForm.useForm = Form.useForm;

export default BaseForm;
