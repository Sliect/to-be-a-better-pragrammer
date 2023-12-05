import React from 'react';
import { Form } from 'antd';
import sortedUniq from 'lodash/sortedUniq';
import { useFormContext } from '../contexts/FormContext';

import type { FormInstance } from 'antd/es/form';

export type IWhenWrapProps = {
  /** 联动显示隐藏 */
  when?: [(vals: any, form?: FormInstance) => boolean, string[]];
  children: React.ReactNode;
};

/**
 * WhenWrap 逻辑隐藏容器
 * @param props
 * @returns
 */
const WhenWrap = ({ when, children }: IWhenWrapProps) => {
  const form = useFormContext();

  if (when) {
    const [predicate = () => true, dependencies = []] = when ?? [];

    return (
      <Form.Item noStyle dependencies={sortedUniq(dependencies)}>
        {({ getFieldsValue }: { getFieldsValue: () => any }) => {
          const vals = getFieldsValue();
          const predicated = predicate(vals, form);

          return predicated ? children : null;
        }}
      </Form.Item>
    );
  }

  return <>{children}</>;
};

export default WhenWrap;
