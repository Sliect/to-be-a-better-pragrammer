import React, { Children, cloneElement, useEffect } from 'react';
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';
import MinusCircleFilled from '@ant-design/icons/MinusCircleFilled';
import useList from './useList';
import { useFormContext } from '../../contexts/FormContext';
import { useFieldContext } from '../../contexts/FieldContext';
import createField from '../../createField';
import { ClsPrefix } from '../../consts';
import { Item, ListProps } from './types';
import './index.less';

const List: React.FC<ListProps> = ({
  value,
  min = 1,
  max = 5,
  addText,
  transformFieldProps,
  children,
}) => {
  const form = useFormContext()!;
  const { name } = useFieldContext()!;
  const { dataSource, add, remove, setDataSource, mainKey } = useList({
    onChange: (newDataSource: Item[]) => {
      form.setFieldsValue({
        [name as string]: newDataSource,
      });
      // 在这里 getFieldsValue 数据没更新，getFieldValue 数据已更新。。。
    },
    onAddOrRemove: () => {
      form.validateFields([name as string]);
    },
  });

  useEffect(() => {
    if (value) setDataSource(value);
  }, [setDataSource, value]);

  return (
    <div className={`${ClsPrefix}-form-list-wrap`}>
      <div className={`${ClsPrefix}-form-list`}>
        {dataSource.map((item, index) => {
          return (
            <div key={mainKey + index} className={`${ClsPrefix}-form-list-item`}>
              <div className={`${ClsPrefix}-form-list-fields`}>
                {Children.map<React.ReactElement, React.ReactElement>(children, (child) => {
                  return cloneElement(child, {
                    ...(transformFieldProps
                      ? transformFieldProps(child.props, index)
                      : child.props),
                    name: [name as string, index, child.props.name],
                    key: mainKey + index + child.props.name,
                    className: `${ClsPrefix}-form-list-field`,
                    onChange: (event: any) => {
                      if (event && event.target) {
                        dataSource[index][child.props.name] = child.props.getValueFromEvent
                          ? child.props.getValueFromEvent(event.target.value)
                          : event.target.value || event.target.checked;
                      } else {
                        dataSource[index][child.props.name] = event;
                      }

                      setDataSource([...dataSource]);
                    },
                  });
                })}
              </div>

              {index < min ? null : (
                <span
                  className={`${ClsPrefix}-form-list-remove`}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <MinusCircleFilled
                    style={{ marginRight: '6px', fontSize: '16px', verticalAlign: 'sub' }}
                  />
                  删除
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        className={
          dataSource.length == max
            ? `${ClsPrefix}-form-list-add disabled`
            : `${ClsPrefix}-form-list-add`
        }
        onClick={() => {
          if (dataSource.length < max) add();
        }}
      >
        <PlusCircleFilled style={{ marginRight: '6px', fontSize: '16px', verticalAlign: 'sub' }} />
        {addText ? addText : '添加'}
      </div>
    </div>
  );
};

export default createField(List, {
  defaultDetailType: 'list',
  defaultFormItemProps: {
    shouldUpdate: true,
  },
});
