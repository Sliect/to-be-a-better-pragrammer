import React from 'react';
import { AutoComplete as AntdAutoComplete, Input } from 'antd';
import createField from '../../createField';
import { useFieldContext } from '../../contexts/FieldContext';
import { AutoCompleteProps as AntdAutoCompleteProps } from 'antd/es/auto-complete';

export type AutoCompleteMode = 'input' | 'textarea' | 'search';

export type AutoCompleteProps = AntdAutoCompleteProps & {
  mode?: AutoCompleteMode;
};

/**
 * 自动完成，扩展输入框、文本框、搜索框三种展示模式
 * @param props
 * @returns
 */
const AutoComplete: React.FC<AutoCompleteProps> = ({ children, mode = 'input', ...props }) => {
  const { label } = useFieldContext()!;

  let node = null;
  let placeholder = '';
  switch (mode) {
    case 'textarea':
      node = <Input.TextArea placeholder={placeholder} className="custom" style={{ height: 50 }} />;
      placeholder = `请输入${label || ''}，或选择匹配项`;
      break;
    case 'search':
      node = <Input.Search placeholder={placeholder} enterButton />;
      placeholder = `请搜索`;
      break;
    default:
      placeholder = `请输入${label || ''}，或选择匹配项`;
      break;
  }

  return (
    <AntdAutoComplete placeholder={placeholder} {...props}>
      {node}

      {children}
    </AntdAutoComplete>
  );
};

type AutoCompleteType = typeof AutoComplete;

interface AutoCompleteInterface extends AutoCompleteType {
  Option: typeof AntdAutoComplete.Option;
}

const FinalAutoComplete = createField<AutoCompleteProps>(AutoComplete) as AutoCompleteInterface;
FinalAutoComplete.Option = AntdAutoComplete.Option;

export default FinalAutoComplete;
