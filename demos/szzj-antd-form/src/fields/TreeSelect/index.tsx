import React from 'react';
import { TreeSelect as AntdTreeSelect } from 'antd';
import createField from '../../createField';
import { useFieldContext } from '../../contexts/FieldContext';
import { TreeSelectProps } from 'antd/es/tree-select';

/* @ts-ignore */
const TreeSelect: React.FC<TreeSelectProps<any>> = ({ children, ...rest }) => {
  const { label } = useFieldContext()!;

  return (
    <AntdTreeSelect placeholder={`请输入${label}`} {...rest}>
      {children}
    </AntdTreeSelect>
  );
};

const TreeSelectField = createField<TreeSelectProps<any>>(TreeSelect);

type TreeSelectType = typeof TreeSelectField;

interface TreeSelectInterface extends TreeSelectType {
  TreeNode: typeof AntdTreeSelect.TreeNode;
  SHOW_ALL: typeof AntdTreeSelect.SHOW_ALL;
  SHOW_PARENT: typeof AntdTreeSelect.SHOW_PARENT;
  SHOW_CHILD: typeof AntdTreeSelect.SHOW_CHILD;
}

const FinalTreeSelect = TreeSelectField as TreeSelectInterface;
FinalTreeSelect.TreeNode = AntdTreeSelect.TreeNode;
FinalTreeSelect.SHOW_ALL = AntdTreeSelect.SHOW_ALL;
FinalTreeSelect.SHOW_PARENT = AntdTreeSelect.SHOW_PARENT;
FinalTreeSelect.SHOW_CHILD = AntdTreeSelect.SHOW_CHILD;

export default FinalTreeSelect;
