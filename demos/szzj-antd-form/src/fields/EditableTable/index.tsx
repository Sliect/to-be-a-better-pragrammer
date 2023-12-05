import React, { forwardRef } from 'react';
import Form from '../../Form';
import EditableTable from './EditableTable';
import './index.less';

import type { IEditableTableProps, IEntity, IRef } from './types';

const EditableTableField: React.ForwardRefRenderFunction<
  IRef<IEntity<any>>,
  IEditableTableProps<IEntity<any>>
> = (props, ref) => {
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevVals, currVals) => {
        return prevVals[props.name] !== currVals[props.name];
      }}
    >
      {(form) => {
        const value = form.getFieldValue(props.name);

        return (
          <EditableTable
            {...props}
            value={value}
            ref={ref}
            // @ts-ignore
            form={form}
          />
        );
      }}
    </Form.Item>
  );
};

export default forwardRef(EditableTableField) as <T extends IEntity<T>>(
  props: IEditableTableProps<T> & {
    ref?: React.Ref<IRef<T>>;
  },
) => React.ReactElement;
