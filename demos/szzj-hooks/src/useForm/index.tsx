import React, { useRef, useState, useEffect, useCallback, forwardRef, cloneElement } from 'react';
import Validator, { Rules, ValidateOption, ErrorList } from 'async-validator';
import set from 'lodash/set';
import get from 'lodash/get';
import unset from 'lodash/unset';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import useRealtimeRef from '../useRealtimeRef';
import { FieldMeta, Fields, Errors, Options, Form } from './types';

export type { FieldMeta, Fields, Errors, Options, Form };

/**
 * 虚拟组件，用于执行销毁函数，为下游元素注入 antd3 所需的校验错误提示
 */
const VirtualField = forwardRef(
  (
    {
      unRegisterField,
      children,
      ...rest
    }: {
      unRegisterField: () => void;
      children: React.ReactElement;
    },
    ref,
  ) => {
    // 实时缓存最新的销毁函数
    const fnRef = useRealtimeRef(unRegisterField);

    useEffect(() => {
      return () => fnRef.current();
    }, []);

    return cloneElement(children, { ref, ...rest });
  },
);

const useForm = function <Values extends {}>(options?: Options<Values>) {
  const { onValuesChange, pure } = options || ({} as Options<Values>);

  /** fieldsMeta 平铺结构 */
  const fieldsMetaRef = useRef<{ [name: string]: FieldMeta<Values> }>({});
  /** fieldsRef 平铺结构，持有字段元素 ref 引用 */
  const fieldsRef = useRef<{ [name: string]: any }>({});
  /** valuesRef 不包含默认值 */
  const valuesRef = useRef<Values>({} as Values);
  /** 嵌套结构，缓存错误文案 */
  const errorsRef = useRef<Errors>({} as Errors);
  /** 重刷页面唯一接口 */
  const [_, forceUpdate] = useState<{}>({});

  /**
   * 注册
   * @param name
   * @param meta
   */
  const registerField = useCallback((name: string, meta?: FieldMeta<Values>) => {
    setFieldMeta(name, meta || {});

    return () => {
      unRegisterField(name);
    };
  }, []);

  /**
   * 获取字段名
   * @param names
   */
  const getFieldsName = useCallback((names?: string[]) => {
    return names ? names : Object.keys(fieldsMetaRef.current);
  }, []);

  /**
   * 设置元数据
   * @param name
   * @param key
   * @param value
   */
  const setFieldMeta = useCallback((name: string, key: string | FieldMeta<Values>, value?: any) => {
    if (typeof key !== 'string') {
      fieldsMetaRef.current[name] = key || {};
    } else if (typeof key === 'string') {
      if (!fieldsMetaRef.current[name]) fieldsMetaRef.current[name] = {};
      const meta: FieldMeta<Values> = fieldsMetaRef.current[name];
      meta[key] = value;
    }
  }, []);

  /**
   * 获取元数据
   * @param name
   * @param key
   */
  const getFieldMeta = useCallback(
    (name: string, key?: string) => {
      const meta = fieldsMetaRef.current[name];
      if (meta) {
        if (key) return meta[key];
        return meta;
      }

      // 对嵌套数据的父属性，转换处理，使元数据有值，意为父属性字段存在
      const fieldsMetaData = {};
      getFieldsName().forEach((fieldName) => {
        set(fieldsMetaData, fieldName, fieldsMetaRef.current[fieldName]);
      });
      const fieldMeta = get(fieldsMetaData, name);
      if (key) return fieldMeta?.[key];
      return fieldMeta;
    },
    [getFieldsName],
  );

  /**
   * 设置字段引用
   * @param name
   * @param ref
   */
  const setFieldRef = useCallback((name: string, ref: any) => {
    if (ref) {
      fieldsRef.current[name] = ref;
    } else {
      delete fieldsRef.current[name];
    }
  }, []);

  /**
   * 获取字段的 ref
   * @param name
   */
  const getFieldRef = useCallback(
    (name: string) => {
      return fieldsRef.current[name];
    },
    [fieldsRef],
  );

  /**
   * 是否有交互行为发生，或手动设置过值
   * @param name
   */
  const isFieldTouched = useCallback((name: string) => {
    const currentValue = get(valuesRef.current, name);
    const trasver = (val) => {
      let result: boolean;
      // 引用类型，递归判断子属性是否无值
      if (Array.isArray(val)) {
        result = val.every((subVal) => {
          return trasver(subVal);
        });
      } else if (isPlainObject(val)) {
        result = Object.keys(val).every((key) => {
          return trasver(val[key]);
        });
      } else {
        /**
         * 与 setFieldsValue 设置值逻辑相同
         * 如果手动设置为 undefined，getFieldsValue 获取到 initialValue，设置空值可使用 null
         */
        result = val !== undefined;
      }

      return result;
    };

    return trasver(currentValue);
  }, []);

  /**
   * 是否有交互行为发生，或手动设置过值
   */
  const isFieldsTouched = useCallback(() => {
    return getFieldsName().some((name: string) => {
      return isFieldTouched(name);
    });
  }, [getFieldsName, isFieldTouched]);

  /**
   * 获取初始值
   */
  const getFieldsInitialValue = useCallback(() => {
    const initialValues: Values = {} as Values;
    getFieldsName().forEach((name) => {
      set(initialValues, name, getFieldMeta(name, 'initialValue'));
    });

    return initialValues;
  }, [getFieldsName, getFieldMeta]);

  /**
   * 获取初始值
   * @param name
   */
  const getFieldInitialValue = useCallback(
    (name: string) => {
      const initialValues = getFieldsInitialValue();
      return get(initialValues, name);
    },
    [getFieldsInitialValue],
  );

  /**
   * 获取值。设置 initialValue 初始值会引起 getFieldValue 数据变更，但不会引起重绘
   * @param name
   */
  const getFieldValue = useCallback(
    (name: string) => {
      const fieldMeta = getFieldMeta(name);
      if (pure && !fieldMeta) return;
      const fieldInitialValue = getFieldInitialValue(name);
      const fieldValue = get(valuesRef.current, name);
      // @FIXME 深层属性判断 touch 与否有问题
      return isFieldTouched(name) ? fieldValue : fieldInitialValue;
    },
    [getFieldMeta, getFieldInitialValue, isFieldTouched],
  );

  /**
   * 获取值
   */
  const getFieldsValue = useCallback(() => {
    const values: Values = {} as Values;
    const names = getFieldsName();
    names.forEach((name) => {
      set(values, name, getFieldValue(name));
    });
    return values;
  }, [getFieldsName, getFieldValue]);

  /**
   * 销毁
   * @param name
   * @param meta
   */
  const unRegisterField = useCallback(
    (name: string) => {
      const fieldsMetaTemp = { ...fieldsMetaRef.current };
      delete fieldsMetaTemp[name];
      fieldsMetaRef.current = fieldsMetaTemp;

      const newValues = { ...valuesRef.current };
      unset(newValues, name);
      valuesRef.current = newValues;

      const newErrors = { ...errorsRef.current };
      unset(newErrors, name);
      errorsRef.current = newErrors;

      forceUpdate({});

      const values = getFieldsValue();
      onValuesChange?.(values);
    },
    [getFieldsValue],
  );

  /**
   * 校验字段，内部
   * @param names
   */
  const _validate = useCallback(
    (names?: string[], vals?: Values, validateOption?: ValidateOption): Promise<Values> => {
      const fieldsName = getFieldsName(names); // 平铺结构
      const values: Values = vals ? vals : ({} as Values);
      const rules: Rules = {};
      const innerValidateOption: ValidateOption = validateOption ? validateOption : {};

      fieldsName.forEach((name: string) => {
        // values 以深层属性为键
        if (!vals) values[name] = getFieldValue(name);
        const fieldRules = getFieldMeta(name, 'rules');
        if (fieldRules) rules[name] = fieldRules;
        if (!validateOption) {
          const validateFirst = getFieldMeta(name, 'validateFirst');
          if (validateFirst) innerValidateOption.first = validateFirst;
        }
      });

      return new Promise((resolve, reject) => {
        new Validator(rules).validate(values, validateOption, (errorList: ErrorList) => {
          if (!errorList) {
            const errs = { ...errorsRef.current };
            getFieldsName(names).forEach((name) => {
              set(errs, name, undefined);
            });
            errorsRef.current = errs;
            forceUpdate({});

            // result 转换为嵌套数据
            const result: Values = {} as Values;
            Object.keys(values).forEach((key) => {
              set(result, key, values[key]);
            });
            resolve(result);
          } else {
            const errs: { [key: string]: string[] } = {};
            errorList.forEach(({ field, message }) => {
              if (!errs[field]) errs[field] = [message];
              else errs[field].push(message);
            });

            const newErrors = { ...errorsRef.current };
            getFieldsName(names).forEach((name) => {
              if (errs[name]) set(newErrors, name, errs[name]);
              else set(newErrors, name, undefined);
            });

            errorsRef.current = newErrors;
            forceUpdate({});

            reject({
              errors: newErrors,
              values,
            });
          }
        });
      });
    },
    [getFieldsName, getFieldValue, getFieldMeta],
  );

  /**
   * 校验字段
   * @param names
   */
  const validateFields = useCallback(
    (names?: string[], validateOption?: ValidateOption): Promise<Values> => {
      const values: Values = {} as Values;
      if (names) {
        getFieldsName(names).forEach((name: string) => {
          values[name] = getFieldValue(name);
        });
      }

      return _validate(names, names ? values : undefined, validateOption);
    },
    [getFieldsName, getFieldValue, _validate],
  );

  /**
   * 校验字段
   * @param name
   * @param value
   */
  const validateField = useCallback(
    (name: string, value?: any): Promise<Values> => {
      // @ts-ignore
      return _validate([name], {
        [name]: value !== undefined ? value : getFieldValue(name),
      });
    },
    [_validate, getFieldValue],
  );

  /**
   * 字段组件装饰器
   * @param name
   * @param meta
   */
  const getFieldDecorator = useCallback(
    (name: string, meta: FieldMeta<Values> = {} as FieldMeta<Values>) => {
      registerField(name, meta);
      const {
        trigger = 'onChange',
        validateTrigger = 'onChange',
        valuePropName = 'value',
        getValueFromEvent = (e: any) => (e && e.target ? e.target[valuePropName] : e),
        normalize,
      } = meta;

      return (inst: React.ReactElement) => {
        const instProps = inst.props;
        const value = getFieldValue(name);
        const defaultValue = getFieldInitialValue(name);

        const props = {
          ...instProps,
          defaultValue: normalize ? normalize(defaultValue) : defaultValue,
          [valuePropName]: normalize ? normalize(value) : value,
          [trigger]: (...args: any[]) => {
            instProps[trigger] && instProps[trigger](...args);
            const value = getValueFromEvent ? getValueFromEvent(...args) : args[0];
            setFieldValue(name, value);
          },
        };

        const originMethod = props[validateTrigger];
        props[validateTrigger] = (...args: any[]) => {
          originMethod && originMethod(...args);
          const value = getValueFromEvent ? getValueFromEvent(...args) : args[0];
          validateField(name, value);
        };

        const saveRef = (ref: any) => {
          if (instProps.ref && typeof instProps.ref == 'function') {
            instProps.ref(ref);
          }

          setFieldRef(name, ref);
        };
        props.ref = saveRef;

        const PropsForAntd3FormItem = {
          'data-name': name,
          'data-field-name': name,
          'data-__field': {
            errors: get(errorsRef.current, name)?.map((message) => ({ message })),
            value,
          },
          'data-__meta': {
            validate: [
              {
                rules: meta.rules,
              },
            ],
          },
        };

        return (
          <VirtualField
            unRegisterField={() => {
              unRegisterField(name);
            }}
            {...PropsForAntd3FormItem}
          >
            {React.cloneElement(inst, props)}
          </VirtualField>
        );
      };
    },
    [
      registerField,
      unRegisterField,
      getFieldValue,
      getFieldInitialValue,
      validateField,
      setFieldRef,
    ],
  );

  /**
   * 获取错误文案
   */
  const getFieldsError = useCallback(() => {
    const errs: Errors = {};
    const names = getFieldsName();
    names.forEach((name) => {
      set(errs, name, get(errorsRef.current, name));
    });
    return errs;
  }, [getFieldsName]);

  /**
   * 获取错误文案
   * @param name
   */
  const getFieldError = useCallback(
    (name: string) => {
      const fieldMeta = getFieldMeta(name);
      if (pure && !fieldMeta) return;
      return get(errorsRef.current, name);
    },
    [getFieldMeta],
  );

  /**
   * 设置字段的值
   * @param name
   * @param value
   * @param touched
   */
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      if (pure && !getFieldMeta(name)) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`${name} has not registered.`);
        }
        return;
      }

      const values = { ...valuesRef.current };
      set(values, name, value);

      valuesRef.current = values;
      forceUpdate({});

      onValuesChange?.(values);
    },
    [getFieldMeta],
  );

  /**
   * 设置字段的值
   * @param vals
   */
  const setFieldsValue = useCallback(
    (vals: Fields) => {
      let filterVals: Fields = {};
      if (pure) {
        Object.keys(vals).forEach((name) => {
          if (getFieldMeta(name)) {
            filterVals[name] = vals[name];
          } else if (process.env.NODE_ENV === 'development') {
            console.warn(`${name} has not registered.`);
          }
        });
      } else {
        filterVals = vals;
      }

      const values = { ...valuesRef.current, ...filterVals };

      valuesRef.current = values;
      forceUpdate({});

      onValuesChange?.(values);
    },
    [getFieldMeta, getFieldsName],
  );

  /**
   * 重置为初始值
   */
  const resetFields = useCallback(
    (names?: string[]) => {
      if (names) {
        const values = valuesRef.current;
        const errors = errorsRef.current;

        names.forEach((name: string) => {
          unset(values, name);
          unset(errors, name);
        });

        valuesRef.current = values;
        errorsRef.current = errors;
      } else {
        valuesRef.current = {} as Values;
        errorsRef.current = {};
      }

      forceUpdate({});
    },
    [getFieldsName],
  );

  /**
   * 判断表单是否变更
   */
  const isFormChanged = useCallback((): boolean => {
    const values = getFieldsValue();
    return getFieldsName().some((name: string) => {
      const initialValue = getFieldInitialValue(name);
      const value = get(values, name);
      return !isEqual(value, initialValue);
    });
  }, [getFieldsValue, getFieldsName, getFieldInitialValue]);

  /**
   * 判断表单项是否变更
   */
  const isFieldChanged = useCallback(
    (name: string): boolean => {
      const initialValue = getFieldInitialValue(name);
      const value = getFieldValue(name);
      return !isEqual(value, initialValue);
    },
    [getFieldsValue, getFieldInitialValue],
  );

  return {
    registerField,
    unRegisterField,
    setFieldMeta,
    getFieldMeta,
    getFieldDecorator,
    getFieldRef,
    getFieldsValue,
    getFieldValue,
    getFieldInitialValue,
    getFieldsError,
    getFieldError,
    setFieldValue,
    setFieldsValue,
    resetFields,
    validateField,
    validateFields,
    isFormChanged,
    isFieldChanged,
    isFieldTouched,
    isFieldsTouched,
  };
};

export default useForm;
