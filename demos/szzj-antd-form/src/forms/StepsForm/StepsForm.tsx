import React, {
  Children,
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Steps, Button, Form, Modal } from 'antd';
import './index.less';

import type { FormInstance } from 'antd/es/form';
import type { Action, SaveAction, StepsFormProps, ContentRefType, RefType } from './types';

const { Step } = Steps;

const StepsForm = function (
  {
    current: currentProp,
    formRef: formRefProp,
    style,
    onNext,
    onPrev,
    onCancel,
    onSave,
    onSubmit,
    onStepChange,
    onChange,
    onFormChange,
    onFormFinish,
    children,
    footerRender,
    buttonConfig,
  }: StepsFormProps,
  ref: React.Ref<RefType>,
) {
  const activeContentRef = useRef<ContentRefType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<{ [key: string]: any }>({});
  const formRef = useRef<FormInstance>();
  const [current, setCurrent] = useState<number>(currentProp !== undefined ? currentProp : 0);
  const [submitting, setSubmitting] = useState(false);

  const stepLength = useMemo(() => {
    let result = 0;
    Children.forEach(children, (child: React.ReactElement) => {
      if (!child.props.virtual) result += 1;
    });

    return result;
  }, [children]);

  const getNameByStep = useCallback(
    (step: number) => {
      const child = React.Children.toArray(children)[step] as React.ReactElement;
      return child.props.name;
    },
    [children],
  );

  useEffect(() => {
    if (currentProp !== undefined && currentProp !== current) setCurrent(Number(currentProp));
  }, [currentProp, current]);

  const go = useCallback(
    (step: number, options: { action: Action }) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect?.top !== undefined) window.scrollTo(0, rect?.top);
      const formName = getNameByStep(current);
      const currentValues = valuesRef.current[formName];
      onChange?.(step, {
        current,
        currentValues,
        values: valuesRef.current,
        action: options.action,
      });
      // 受控模式下，由外部切换变更
      if (currentProp === undefined) setCurrent(step);
    },
    [current, currentProp, getNameByStep],
  );

  const isFieldsChanged = useCallback(() => {
    if (formRef.current) return formRef.current?.isFieldsTouched();
    return false;
  }, []);

  const innerSubmit = useCallback(
    (options: { action: SaveAction }) => {
      if (formRef.current) {
        setSubmitting(true);
        return formRef.current
          ?.validateFields()
          .then(async (vals: any) => {
            formRef.current?.submit();

            const formName = getNameByStep(current);
            valuesRef.current[formName] = vals;
            if (activeContentRef.current?.submit) {
              const data = await activeContentRef.current.submit(vals, {
                current,
                values: valuesRef.current,
                action: options?.action,
              });
              setSubmitting(false);

              return data;
            } else {
              setSubmitting(false);
            }

            return vals;
          })
          .catch((err: any) => {
            setSubmitting(false);

            const { errorFields } = err;
            if (errorFields?.length) {
              const { name } = errorFields[0];
              formRef.current?.scrollToField(name, { block: 'start' });
            }

            throw err;
          });
      }

      return Promise.reject(null);
    },
    [current],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: innerSubmit,
        formRef: formRef,
        valuesRef: valuesRef,
        contentRef: activeContentRef,
      };
    },
    [innerSubmit],
  );

  const goPrev = useCallback(() => {
    const exeute = () => {
      const cb = () => {
        go(current - 1, { action: 'prev' });
      };

      if (!onPrev) return cb();

      const res = onPrev?.();

      if (res?.then && typeof res?.then === 'function') {
        res.then((success) => {
          if (success !== false) cb();
        });
      } else {
        cb();
      }
    };

    if (isFieldsChanged()) {
      Modal.confirm({
        title: '温馨提示',
        content: '表单数据已变更，请确认是否返回上一步',
        onOk: exeute,
        okText: '继续',
      });
    } else {
      exeute();
    }
  }, [isFieldsChanged, go, current]);

  const goNext = useCallback(() => {
    const cb = () => {
      go(current + 1, { action: 'next' });
    };

    innerSubmit({
      action: 'next',
    }).then((vals: any) => {
      const res = onNext?.(vals, {
        current,
        values: valuesRef.current,
      });

      if (res?.then && typeof res?.then === 'function') {
        res.then((success) => {
          if (success !== false) cb();
        });
      } else {
        cb();
      }
    });
  }, [go, current, innerSubmit]);

  const save = useCallback(() => {
    innerSubmit({
      action: 'save',
    }).then((vals: any) => {
      onSave?.(vals, {
        current,
        values: valuesRef.current,
      });
    });
  }, [current, innerSubmit]);

  const submit = useCallback(() => {
    innerSubmit({
      action: 'submit',
    }).then((vals: any) => {
      onSubmit?.(vals, {
        current,
        values: valuesRef.current,
      });
    });
  }, [current, innerSubmit]);

  const cancel = useCallback(() => {
    onCancel?.();
  }, []);

  const changeStep = useCallback(
    (step: number) => {
      const cb = () => {
        onStepChange?.(step);
        go(step, { action: 'changestep' });
      };

      if (isFieldsChanged()) {
        Modal.confirm({
          title: '温馨提示',
          content: '表单数据已变更，请确认是否继续跳转其他步骤',
          onOk: () => {
            cb();
          },
          okText: '跳转',
        });
      } else {
        cb();
      }
    },
    [go],
  );

  const btns = useMemo(() => {
    const btnsMap = {
      cancel: {
        key: 'cancel',
        condition: true,
        btn: (
          <Button
            loading={submitting}
            {...buttonConfig?.cancel?.props}
            className="szzj-antd-step-forms-footer-button"
            onClick={cancel}
            key="cancel"
          >
            {buttonConfig?.cancel?.text ?? '取消'}
          </Button>
        ),
      },
      prev: {
        key: 'prev',
        condition: current > 0,
        btn: (
          <Button
            loading={submitting}
            {...buttonConfig?.prev?.props}
            className="szzj-antd-step-forms-footer-button"
            onClick={goPrev}
            key="prev"
          >
            {buttonConfig?.prev?.text ?? '上一步'}
          </Button>
        ),
      },
      save: {
        key: 'save',
        condition: buttonConfig?.save?.enable !== undefined ? buttonConfig?.save?.enable : true,
        btn: (
          <Button
            loading={submitting}
            {...buttonConfig?.save?.props}
            className="szzj-antd-step-forms-footer-button"
            onClick={save}
            key="save"
          >
            {buttonConfig?.save?.text ?? '保存'}
          </Button>
        ),
      },
      next: {
        key: 'next',
        condition: current < stepLength - 1,
        btn: (
          <Button
            type="primary"
            loading={submitting}
            {...buttonConfig?.next?.props}
            className="szzj-antd-step-forms-footer-button"
            onClick={goNext}
            key="next"
          >
            {buttonConfig?.next?.text ?? '下一步'}
          </Button>
        ),
      },
      submit: {
        key: 'submit',
        condition:
          (buttonConfig?.submit?.enable !== undefined ? buttonConfig?.submit?.enable : true) &&
          current === stepLength - 1,
        btn: (
          <Button
            type="primary"
            loading={submitting}
            {...buttonConfig?.submit?.props}
            className="szzj-antd-step-forms-footer-button"
            onClick={submit}
            key="submit"
          >
            {buttonConfig?.submit?.text ?? '提交'}
          </Button>
        ),
      },
    };

    const activedBtns = Object.keys(btnsMap)
      .filter((key) => btnsMap[key as keyof typeof btnsMap].condition)
      .sort((aKey, bKey) => {
        const aOrder = buttonConfig?.[aKey as keyof typeof buttonConfig]?.order;
        const bOrder = buttonConfig?.[bKey as keyof typeof buttonConfig]?.order;
        if (aOrder !== undefined && bOrder !== undefined) {
          return bOrder - aOrder;
        }

        return 1;
      })
      .map((key) => btnsMap[key as keyof typeof btnsMap].btn);

    return footerRender ? footerRender({ current, buttons: activedBtns }) : activedBtns;
  }, [
    footerRender,
    buttonConfig,
    current,
    children,
    goPrev,
    goNext,
    save,
    submit,
    cancel,
    submitting,
  ]);
  return (
    <div className="szzj-antd-step-forms" style={style} ref={containerRef}>
      <div className="szzj-antd-step-forms-steps">
        <Steps current={current} onChange={changeStep}>
          {Children.map(children, (item) => {
            const {
              name,
              title,
              subTitle,
              description,
              icon,
              status,
              disabled,
              stepProps,
            } = item.props;

            return (
              <Step
                key={name}
                title={title}
                subTitle={subTitle}
                description={description}
                icon={icon}
                status={status}
                disabled={disabled}
                {...stepProps}
              />
            );
          })}
        </Steps>
      </div>

      <div className="szzj-antd-step-forms-content">
        <Form.Provider onFormChange={onFormChange} onFormFinish={onFormFinish}>
          {Children.map(children, (item, index) => {
            const {
              name,
              title,
              subTitle,
              description,
              icon,
              status,
              stepProps,
              disabled,
              ...rest
            } = item.props;

            return (
              <Form key={name} name={name} {...rest}>
                {index === current && (
                  /**
                   * @todo 每次必刷新，性能不好，但能简化编程
                   */
                  <Form.Item noStyle shouldUpdate={true}>
                    {(stepForm) => {
                      // @ts-ignore
                      formRef.current = stepForm;
                      // @ts-ignore
                      if (formRefProp) formRefProp.current = stepForm;
                      return React.cloneElement(item.props.children, {
                        form: stepForm,
                        current,
                        currentValues: stepForm.getFieldsValue(),
                        values: valuesRef.current,
                        ref:
                          // 不加这个判断的话，StepsForm.StepForm 都必须要用 forwardRef 包裹
                          item.props.children?.type?.$$typeof === Symbol.for('react.forward_ref')
                            ? activeContentRef
                            : null,
                      });
                    }}
                  </Form.Item>
                )}
              </Form>
            );
          })}
        </Form.Provider>
      </div>

      {Children.map(children, (item, index) => {
        if (index === current && !item.props.virtual)
          return <div className="szzj-antd-step-forms-footer">{btns}</div>;
      })}
    </div>
  );
};

export default forwardRef<RefType, StepsFormProps>(StepsForm);
