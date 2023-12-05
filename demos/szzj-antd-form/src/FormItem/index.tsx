import React from 'react';
import classnames from 'classnames';
import { Form } from 'antd';
import { pick, omit } from '@szzj/utils';
import sortedUniq from 'lodash/sortedUniq';
import { FieldContextProvider } from '../contexts/FieldContext';
import { useFormContext } from '../contexts/FormContext';
import { ClsPrefix } from '../consts';

import './index.less';

import type { FormInstance, FormItemProps, Rule } from 'antd/es/form';

const AntdFormItemPropNames = [
  // antd 属性
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'hidden',
  'htmlFor',
  'initialValue',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'normalize',
  'noStyle',
  'preserve',
  'required',
  'rules',
  'shouldUpdate',
  'tooltip',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',

  // 自定义 FormItem 属性
  'formItemClassName',
  'formItemStyle',
];

/** 额外的自定义属性 */
export const FormItemCustomPropNames = ['when', 'dynamicProps'];

type IProps = FormItemProps & {
  /** 联动显示隐藏 */
  when?: [(vals: any, form?: FormInstance) => boolean, string[]];
};

export type IFormItemProps = IProps & {
  /** 动态属性 */
  dynamicProps?: [(form?: FormInstance) => IProps, string[]];
};

/**
 * 表单容器
 * 扩展 when 字段用于表单联动
 * @param props
 * @returns
 */
const FormItem: React.FC<IFormItemProps> = (props) => {
  const form = useFormContext();
  const { required = true, className, children, rules = [], when, dynamicProps, ...rest } = props;
  const formItemClassName = classnames({
    [`${ClsPrefix}-form-item`]: true,
    [className as string]: !!className,
  });

  let finalRules: Rule[] = rules;
  if (
    required &&
    props.label &&
    finalRules.every((rule) => typeof rule !== 'function' && !rule.required)
  ) {
    finalRules.unshift({
      required: true,
      message: `${props.label}不能为空`,
    });
  }

  if (when || dynamicProps) {
    const [predicate = () => true, dependencies = []] = when ?? [];
    const [getDynamicProps, getDynamicPropsDeps = []] = dynamicProps ?? [];

    return (
      <Form.Item noStyle dependencies={sortedUniq([...dependencies, ...getDynamicPropsDeps])}>
        {({ getFieldsValue }: { getFieldsValue: () => any }) => {
          const realDynamicProps = getDynamicProps?.(form) ?? {};
          const dynamicFormItemProps = pick(realDynamicProps, AntdFormItemPropNames);
          const dynamicFieldItemProps = omit(realDynamicProps, AntdFormItemPropNames);
          const vals = getFieldsValue();
          const predicated = predicate(vals, form);

          // 在函数体内渲染 FieldComp 才可以获取到最新的表单数据
          return predicated ? (
            <FieldContextProvider value={{ ...props, rules: finalRules, ...realDynamicProps }}>
              <Form.Item
                className={formItemClassName}
                required={required}
                validateFirst={true}
                {...rest}
                rules={finalRules}
                {...dynamicFormItemProps}
              >
                {React.isValidElement(children)
                  ? React.cloneElement(children, dynamicFieldItemProps)
                  : children}
              </Form.Item>
            </FieldContextProvider>
          ) : null;
        }}
      </Form.Item>
    );
  }

  return (
    <FieldContextProvider value={{ ...props, rules: finalRules }}>
      <Form.Item
        className={formItemClassName}
        required={required}
        validateFirst={true}
        {...rest}
        rules={finalRules}
      >
        {children}
      </Form.Item>
    </FieldContextProvider>
  );
};

export default FormItem;
