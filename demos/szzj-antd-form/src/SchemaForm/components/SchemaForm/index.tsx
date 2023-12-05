import React, { Fragment, useCallback, useMemo, useImperativeHandle } from 'react';
import classnames from 'classnames';
import { Button, Col } from 'antd';
import Form from '../../../Form';
import { ClsPrefix } from '../../../consts';
import { getFields } from '../../register';
import { SchemaFormProvider } from '../../contexts/SchemaFormContext';
import { defaultLayout } from '../../consts';
import './index.less';

import type { FormInstance } from 'antd/es/form';
import type { FormProps, IFormInstance } from '../../types';

/**
 * 依据 schema 渲染的表单
 * @param form FormInstance，操作表单数据的实例
 * @param fields 表单项的 schema 表示
 * @param className 样式类
 * @param onSubmit 提交操作
 * @param onCancel 取消操作
 * @param layout 布局
 * @param Fields 表单项渲染器映射
 */
const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    form: formInstance,
    fields,
    className,
    onSubmit,
    onCancel,
    layout = 'vertical',
    footer,
    Fields: FieldsProp,
    FieldWrap,
    ...rest
  }: FormProps,
  ref,
) => {
  const [form] = Form.useForm();

  /** 允许字段设置 onChange */
  const fieldsShouldBindChange = useMemo(() => {
    return fields.filter((field) => !!field.onChange);
  }, [fields]);

  const formManager: IFormInstance = useMemo(() => {
    const internalFormManager = formInstance ?? form;
    return {
      ...internalFormManager,
      setFields: (flds: any[]) => {
        internalFormManager.setFields(flds);
        if (
          !('__powerBySzzjSchemaForm' in internalFormManager) ||
          !internalFormManager.__powerBySzzjSchemaForm
        ) {
          fieldsShouldBindChange.forEach((field) => {
            const found = flds.find((fe) => fe.name === field.name);
            if (found) field.onChange(found.value);
          });
        }
      },
      /**
       * 赋值联动
       * @param values
       */
      setFieldsValue: (values: any) => {
        internalFormManager.setFieldsValue(values);
        if (
          !('__powerBySzzjSchemaForm' in internalFormManager) ||
          !internalFormManager.__powerBySzzjSchemaForm
        ) {
          fieldsShouldBindChange.forEach((field) => {
            if (values[field.name] !== undefined) {
              field.onChange(values[field.name]);
            }
          });
        }
      },
    };
  }, [form, fieldsShouldBindChange, formInstance]);

  useImperativeHandle(ref, () => formManager as FormInstance, [formManager]);

  const FieldsMap = useMemo(() => {
    return FieldsProp
      ? {
          ...getFields(),
          ...FieldsProp,
        }
      : getFields();
  }, [FieldsProp]);

  const formClassName = classnames({
    [className as string]: !!className,
    [`${ClsPrefix}-schema-form`]: true,
  });

  const labelCol = useMemo(() => rest.labelCol || defaultLayout.labelCol, [rest]);
  const wrapperCol = useMemo(() => rest.wrapperCol || defaultLayout.wrapperCol, [rest]);
  const btnColLayout = useMemo(() => {
    return labelCol?.span
      ? {
          offset: labelCol.span,
          span: wrapperCol?.span,
        }
      : {
          xs: { offset: labelCol?.xs?.span, span: wrapperCol?.xs?.span },
          sm: { offset: labelCol?.sm?.span, span: wrapperCol?.sm?.span },
          xxl: { offset: labelCol?.xxl?.span, span: wrapperCol?.xxl?.span },
        };
  }, [labelCol, wrapperCol]);

  const handleSubmit = useCallback(() => {
    formManager.validateFields().then((vals: any) => {
      onSubmit?.(vals);
    });
  }, [formManager, onSubmit]);

  const btns = useMemo(() => {
    if (footer === false || !!rest.detail) return null;

    return footer ? (
      footer(formManager)
    ) : (
      <Fragment>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={onCancel}>
          取消
        </Button>
      </Fragment>
    );
  }, [footer, formManager, handleSubmit, onCancel]);

  return (
    <SchemaFormProvider value={{ form: formManager, Fields: FieldsMap, FieldWrap }}>
      <Form
        scrollToFirstError
        preserve={false} // 字段删除时移除数据
        {...rest}
        className={formClassName}
        layout={layout}
        labelCol={layout === 'horizontal' ? labelCol : undefined}
        wrapperCol={layout === 'horizontal' ? wrapperCol : undefined}
        form={formManager}
      >
        {fields.map((field) => {
          const { fieldType = 'input', ...fieldProps } = field;
          const FieldComp = FieldsMap[fieldType] as React.ComponentType;
          const innerProps: any = {};
          if (['input', 'textarea', 'select', 'cascader', 'tree-select'].includes(fieldType)) {
            innerProps.allowClear =
              fieldProps.allowClear === undefined ? true : fieldProps.allowClear;
          }

          const fieldNode = (
            <FieldComp
              {...innerProps}
              required
              {...fieldProps}
              key={fieldProps.key || fieldProps.name}
              form={formManager}
            />
          );

          return FieldWrap ? (
            <FieldWrap key={fieldProps.key || fieldProps.name}>{fieldNode}</FieldWrap>
          ) : (
            fieldNode
          );
        })}

        {layout === 'horizontal' ? <Col {...btnColLayout}>{btns}</Col> : btns}
      </Form>
    </SchemaFormProvider>
  );
};

const SchemaForm = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export default SchemaForm;
