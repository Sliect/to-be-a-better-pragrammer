import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Form from '../../../Form';
import WhenWrap, { type IWhenWrapProps } from '../../../FormItem/WhenWrap';
import { useSchemaFormContext } from '../../contexts/SchemaFormContext';
import { useFormAttrsContext } from '../../../contexts/FormAttrsContext';

import './index.less';

import type { FormInstance } from 'antd/es/form';
import type { Field } from '../../types';

function AntdList({
  name,
  label,
  description,
  fields,
  form,
  max,
  min,
  when,
  style,
  transformFieldProps,
  ...rest
}: {
  name: string;
  label: string;
  description?: string;
  /** 表单的 schema 描述 */
  fields: Field[];
  /** 表单实例 */
  form: FormInstance;
  /** 最小个数限制 */
  max?: number;
  /** 最大个数限制 */
  min?: number;
  /** 联动显示隐藏 */
  when?: IWhenWrapProps['when'];
  /** 样式 */
  style?: React.CSSProperties;
  /** props 转换 */
  transformFieldProps?: (props: any, index: number) => any;
}) {
  const { Fields, FieldWrap } = useSchemaFormContext();
  const { detail } = useFormAttrsContext()!;

  const renderFormList = () => {
    return (
      <Form.List name={name} {...rest}>
        {(listFields, { add, remove }) => (
          <>
            {listFields.map(({ key, name }, index) => {
              return (
                <div key={key} className="szzj-list-item">
                  <div className="szzj-list-item-header">
                    <span>{`${label}${index + 1}`}</span>
                    {(!min || listFields.length > min) && !detail && (
                      <span 
                        className="szzj-list-item-remove-wrap" 
                        onClick={() => remove(name)}
                      >
                        <MinusCircleOutlined
                          className="szzj-list-item-remove-icon"
                        />
                        删除
                      </span>
                    )}
                  </div>

                  {fields.map((field, index) => {
                    const { fieldType = 'input', ...fieldProps } = field;
                    const FieldComp = Fields?.[fieldType] as React.ComponentType;
                    const innerProps: any = {};
                    if (
                      ['input', 'textarea', 'select', 'cascader', 'tree-select'].includes(fieldType)
                    ) {
                      innerProps.allowClear =
                        fieldProps.allowClear === undefined ? true : fieldProps.allowClear;
                    }

                    const fieldNode = (
                      <FieldComp
                        {...innerProps}
                        required
                        {...(transformFieldProps ? transformFieldProps(fieldProps, index) : fieldProps)}
                        name={[name, fieldProps.name]}
                        key={fieldProps.key || fieldProps.name}
                        form={form}
                      />
                    );

                    return FieldWrap ? (
                      <FieldWrap key={fieldProps.key || fieldProps.name}>{fieldNode}</FieldWrap>
                    ) : (
                      fieldNode
                    );
                  })}
                </div>
              );
            })}

            {(!max || listFields.length < max) && !detail && (
              <Form.Item label={<></>} required={false} colon={false}>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加{label}
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    );
  };

  return (
    <WhenWrap when={when}>
      <div className="szzj-list" style={style}>
        <div className="szzj-list-header">
          <span className="szzj-list-header-mark" />
          <span className="szzj-list-header-title">{label}</span>
        </div>

        {description && <div className="szzj-list-desc">{description}</div>}

        {renderFormList()}
      </div>
    </WhenWrap>
  );
}

export default AntdList;
