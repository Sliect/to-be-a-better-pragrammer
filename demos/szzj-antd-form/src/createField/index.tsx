import React, { useMemo } from 'react';
import omit from 'omit.js';
import FormItem from '../FormItem';
import { useFormContext } from '../contexts/FormContext';
import { useFormAttrsContext } from '../contexts/FormAttrsContext';
import { DetailComponents } from '../detail';
import { getRealRules, enhanceFieldProps } from './utils';
import { extract } from '../utils';
import { AntdFormItemPropNames, DetailFormItemPropNames } from './consts';

import type { FormInstance } from 'antd/es/form';
import type { IFormItemProps } from '../FormItem';

export interface FieldWrapProps extends IFormItemProps {
  detail?: boolean;
  detailType?: string;
  DetailComponent?: React.ComponentType;
  formItemClassName?: string;
  formItemStyle?: React.CSSProperties;
}

interface CreateFieldOptions<T> {
  /** 详情组件类型，优先级低于 defaultDetailComponent */
  defaultDetailType?: string;
  /** 详情展示组件 */
  defaultDetailComponent?: React.ComponentType<any>;
  /** Form.Item 默认的 props 属性 */
  defaultFormItemProps?: Record<string, any>;
  /** 从 props 中动态获取 Form.Item 的 props */
  getFormItemPropsFromProps?: (
    props: Omit<FieldWrapProps & T, 'children' | 'detail' | 'detailType' | 'DetailComponent'>,
    form: FormInstance,
  ) => Record<string, any>;
}

/**
 * 创建 Form.Item 包裹的表单控件，提供详情展示
 * @param FieldComponent
 * @param options
 * @returns
 */
function createField<FieldProps>(
  FieldComponent: React.ComponentType<FieldProps>,
  options?: CreateFieldOptions<FieldProps>,
) {
  const Field: React.FC<FieldProps & FieldWrapProps> = ({
    children,
    detail: detailProp,
    detailType: detailTypeProp,
    DetailComponent: DetailComponentProp,
    ...rest
  }: FieldProps & FieldWrapProps) => {
    const form = useFormContext()!;
    const { detail } = useFormAttrsContext()!;
    const isDetail = useMemo(() => {
      return detailProp !== undefined ? detailProp : detail;
    }, [detail, detailProp]);
    const {
      defaultDetailType = 'text',
      defaultDetailComponent,
      defaultFormItemProps = {},
      getFormItemPropsFromProps,
    } = options || ({} as CreateFieldOptions<FieldProps>);

    const basicFormItemProps = extract(
      rest,
      isDetail ? DetailFormItemPropNames : AntdFormItemPropNames,
    );
    const extraFormItemProps = getFormItemPropsFromProps
      ? getFormItemPropsFromProps(rest, form)
      : undefined;
    const formItemProps = {
      ...defaultFormItemProps,
      ...basicFormItemProps,
      ...extraFormItemProps,
    };

    const { formItemClassName, formItemStyle, ...formItemRest } = formItemProps;

    // @ts-ignore
    const fieldProps = omit(rest, AntdFormItemPropNames) as FieldProps;

    let DetailComponent;
    if (DetailComponentProp) {
      DetailComponent = DetailComponentProp;
    } else if (detailTypeProp) {
      DetailComponent = DetailComponents[detailTypeProp];
    } else if (defaultDetailComponent) {
      DetailComponent = defaultDetailComponent;
    } else {
      DetailComponent = DetailComponents[defaultDetailType];
    }

    if (isDetail) {
      return (
        <FormItem className={formItemClassName} style={formItemStyle} {...formItemRest}>
          {/* @ts-ignore */}
          <DetailComponent {...fieldProps} valuePropName={formItemProps.valuePropName}>
            {children}
          </DetailComponent>
        </FormItem>
      );
    }

    return (
      <FormItem
        className={formItemClassName}
        style={formItemStyle}
        {...formItemRest}
        rules={getRealRules(formItemRest, form)}
      >
        <FieldComponent {...enhanceFieldProps(fieldProps, formItemRest.rules, form)}>
          {children}
        </FieldComponent>
      </FormItem>
    );
  };

  return Field;
}

function FieldDecorator<FieldProps>(options?: CreateFieldOptions<FieldProps>) {
  if (!options) {
    return (FieldComponent: React.ComponentType<FieldProps>) =>
      createField(FieldComponent, options);
  }

  return (FieldComponent: React.ComponentType<FieldProps>) => createField(FieldComponent, options);
}

export default createField;

export const Field = FieldDecorator;
