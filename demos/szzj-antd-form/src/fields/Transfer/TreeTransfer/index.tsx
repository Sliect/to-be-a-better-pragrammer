import React, { useMemo } from 'react';
import { Transfer as AntdTransfer, Tree } from 'antd';
import createField from '../../../createField';
import { TransferProps as AntdTransferProps } from 'antd/es/transfer';
import { DataNode, TreeProps } from 'antd/es/tree';

type TreeTransferProps = AntdTransferProps<any> & {
  treeProps?: TreeProps;
};

const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
  treeNodes.map(({ children, ...props }: any) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const TableTransfer: React.FC<TreeTransferProps> = ({
  children,
  dataSource,
  targetKeys = [],
  treeProps = {},
  ...rest
}) => {
  const transferDataSource = useMemo(() => {
    const result: any[] = [];
    function flatten(list: any[] = []) {
      list.forEach((item) => {
        result.push(item);
        if (item.children) flatten(item.children);
      });
    }
    flatten(dataSource);

    return result;
  }, [dataSource]);

  return (
    <AntdTransfer {...rest} targetKeys={targetKeys} dataSource={transferDataSource}>
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              {...treeProps}
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key as string, !checkedKeys.includes(key as string));
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key as string, !checkedKeys.includes(key as string));
              }}
            />
          );
        }
      }}
    </AntdTransfer>
  );
};

export default createField<TreeTransferProps>(TableTransfer, {
  defaultFormItemProps: {
    valuePropName: 'targetKeys',
  },
});
