import React, { useState, useCallback, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import Form from '../Form';
import { getField } from '../SchemaForm/register';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { ClsPrefix } from '../consts';

import './index.less';

/**
 * 带编辑功能的表单字段详情
 * @param param0
 * @returns
 */
export default function EditableFieldDetail({
  canChangeMode = true,
  onOk,
  fieldType = 'input',
  Field: FieldComp,
  name,
  value,
  options,
  format,
  ...rest
}: {
  /** 是否可以切换编辑或详情态 */
  canChangeMode?: boolean;
  /** 名称 */
  onOk: (vals: Record<string, any>) => Promise<any>;
  /** 字段展示类型 */
  fieldType?: string;
  /** 自定义字段控件 */
  Field?: React.ComponentType<any>;
  /** 表单项 name 值 */
  name: string;
  /** 值 */
  value: any;
  /** 作为下拉框的选项 */
  options?: { label: string; value: string | number }[];
  /** 数据转换，比如用于详情脱敏 */
  format?: (value: any, opts: { isDetail: boolean }) => any;
  [key: string]: any;
}) {
  const [form] = Form.useForm();
  const [mode, setMode] = useState<'detail' | 'edit'>('detail');
  const isDetail = useMemo(() => {
    return !canChangeMode || mode === 'detail';
  }, [canChangeMode, mode]);

  useEffect(() => {
    form.setFieldsValue({
      [name]: format ? format(value, { isDetail }) : value,
    });
  }, [mode, name, value, format, isDetail]);

  const toggleMode = useCallback(() => {
    setMode(isDetail ? 'edit' : 'detail');
  }, [isDetail, form, name, value]);

  const Field = useMemo(() => {
    return FieldComp ?? getField(fieldType as string);
  }, [FieldComp, fieldType]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then((vals: any) => {
      onOk?.(vals).then((res) => {
        if (res?.success) toggleMode();
      });
    });
  }, [form, toggleMode]);

  const handleCancle = useCallback(() => {
    toggleMode();
    const currentValue = form.getFieldValue(name);
    if (currentValue !== value) {
      form.setFieldsValue({
        [name]: format ? format(value, { isDetail }) : value,
      });
    }
  }, [form, toggleMode, isDetail]);

  const className = classnames({
    [`${ClsPrefix}-editable-field-detail`]: true,
    editting: !isDetail,
  });

  return (
    <div className={className}>
      <Form size="small" form={form} detail={isDetail}>
        <Field required name={name} options={options} style={{ width: 240 }} {...rest} />
      </Form>

      {isDetail ? (
        <a onClick={toggleMode} className={`${ClsPrefix}-editable-field-detail-icon`}>
          编辑
        </a>
      ) : (
        <div>
          <CheckOutlined
            className={`${ClsPrefix}-editable-field-detail-icon`}
            onClick={handleSubmit}
          />
          <CloseOutlined
            onClick={handleCancle}
            className={`${ClsPrefix}-editable-field-detail-icon`}
          />
        </div>
      )}
    </div>
  );
}
