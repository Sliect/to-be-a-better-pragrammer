import { FormInstance, FormItemProps, Rule as AntdRule } from 'antd/es/form';

export type Rule = AntdRule & {
  greaterThen?: string | string[];
  greaterThenEqual?: string | string[];
  lessThen?: string | string[];
  lessThenEqual?: string | string[];
  message?: string;
};

export type Rules = Rule[] | ((form: FormInstance) => Rule[]);

/**
 * 获取校验规则
 * @param props
 * @returns
 */
export const getRealRules = (props: FormItemProps & any, form: FormInstance): Rule[] => {
  if (typeof props.rules === 'function') return props.rules(form);

  let rules: Rule[] = [];

  rules = [
    ...rules,
    ...(props.rules || []).map((rule: Rule) => {
      const { greaterThen, greaterThenEqual, lessThen, lessThenEqual, message } = rule;

      if (greaterThen) {
        return {
          validator: async (rule: Rule, value: string) => {
            const targetValue = form.getFieldValue(greaterThen);
            const valueNum = Number(value);
            const targetValueNum = Number(targetValue);
            if (value !== undefined && targetValue !== undefined && valueNum <= targetValueNum) {
              throw new Error(message || '最大值不能小于等于最小值');
            }
          },
        };
      } else if (greaterThenEqual) {
        return {
          validator: async (rule: Rule, value: string) => {
            const targetValue = form.getFieldValue(greaterThenEqual);
            const valueNum = Number(value);
            const targetValueNum = Number(targetValue);
            if (value !== undefined && targetValue !== undefined && valueNum < targetValueNum) {
              throw new Error(message || '最大值不能小于最小值');
            }
          },
        };
      } else if (lessThen) {
        return {
          validator: async (rule: Rule, value: string) => {
            const targetValue = form.getFieldValue(lessThen);
            const valueNum = Number(value);
            const targetValueNum = Number(targetValue);
            if (value !== undefined && targetValue !== undefined && valueNum >= targetValueNum) {
              throw new Error(message || '最小值不能大于等于最大值');
            }
          },
        };
      } else if (lessThenEqual) {
        return {
          validator: async (rule: Rule, value: string) => {
            const targetValue = form.getFieldValue(lessThenEqual);
            const valueNum = Number(value);
            const targetValueNum = Number(targetValue);
            if (value !== undefined && targetValue !== undefined && valueNum > targetValueNum) {
              throw new Error(message || '最小值不能大于最大值');
            }
          },
        };
      }

      return rule;
    }),
  ];

  return rules;
};

/**
 * 获取额外的 props 属性
 * @param type
 * @returns
 */
export const enhanceFieldProps = (
  props: FormItemProps & any,
  rules: Rule[],
  form: FormInstance,
) => {
  if (form && Array.isArray(rules)) {
    const fieldsToValidate = rules
      .map(
        (rule: Rule) =>
          rule.greaterThen || rule.greaterThenEqual || rule.lessThen || rule.lessThenEqual,
      )
      .filter((it: undefined | string | string[]) => !!it);

    if (fieldsToValidate.length) {
      const originOnChange = props.onChange;
      props.onChange = (...args: any[]) => {
        // @ts-ignore
        form.validateFields(fieldsToValidate);
        if (originOnChange) originOnChange(...args);
      };
    }
  }

  return props;
};
