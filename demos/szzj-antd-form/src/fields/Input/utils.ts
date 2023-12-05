import * as Rules from '../../rules';
import { FormInstance, FormItemProps, Rule as AntdRule } from 'antd/es/form';

type Rule = AntdRule & {
  greaterThen?: string | string[];
  greaterThenEqual?: string | string[];
  lessThen?: string | string[];
  lessThenEqual?: string | string[];
  message?: string;
};

/**
 * 获取校验规则
 * @param props
 * @returns
 */
export const getRulesFromProps = (props: FormItemProps & any, form: FormInstance): Rule[] => {
  if (typeof props.rules === 'function') return props.rules;

  let rules: Rule[] = [];

  if (
    props.required !== false &&
    (!props.rules || !props.rules.some((rule: any) => rule.required))
  ) {
    rules.push({
      required: true,
      message: `请输入${props.label}`,
      whitespace: true,
    });
  }

  if (props.valueType && Rules[props.valueType as keyof typeof Rules]) {
    const valueType = props.valueType as keyof typeof Rules;
    rules.push(Rules[valueType] as Rule);
  }

  // 防止 xss 攻击
  rules.push(Rules.xss);

  if (form && props.rules) {
    rules = [...rules, ...props.rules];
  }

  return rules;
};

/**
 * 获取额外的 props 属性
 * @param type
 * @returns
 */
export const getExtraProps = (props: FormItemProps & any, form: FormInstance) => {
  const extraProps: { [key: string]: any } = {};

  if (props.valueType) {
    switch (props.valueType) {
      case 'mobileCn':
        extraProps.type = 'phone';
        extraProps.maxLength = 11;
        break;
      case 'idCard':
        extraProps.maxLength = 18;
        break;
    }
  }

  return extraProps;
};
