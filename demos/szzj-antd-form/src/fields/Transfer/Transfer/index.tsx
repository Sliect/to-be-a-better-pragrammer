import React from 'react';
import { Transfer as AntdTransfer } from 'antd';
import createField from '../../../createField';
import { TransferProps as AntdTransferProps } from 'antd/es/transfer';

const Transfer: React.FC<AntdTransferProps<any>> = ({ children, ...rest }) => {
  return <AntdTransfer {...rest}>{children}</AntdTransfer>;
};

export default createField<AntdTransferProps<any>>(Transfer, {
  defaultFormItemProps: {
    valuePropName: 'targetKeys',
  },
});
