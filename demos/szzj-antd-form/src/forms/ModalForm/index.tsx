import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import 'antd/es/modal/style/index.js';
import classnames from 'classnames';
import { throttle } from '@szzj/utils';
import Form from '../../Form';
import { ClsPrefix } from '../../consts';
import './index.less';

import type { ModalFormProps } from './types';

/**
 * 弹窗表单
 * @param param0
 * @returns
 */
const ModalForm: React.FC<ModalFormProps> = ({
  form: formProp,
  dataSource,
  visible,
  transform,
  format,
  onOk,
  onCancel,
  children,
  formProps,
  className: classNameProp,
  throttleWait,
  ...rest
}) => {
  const [innerForm] = Form.useForm();
  const form = useMemo(() => formProp || innerForm, [formProp, innerForm]);
  const throttledSubmitRef = useRef<ReturnType<typeof throttle>>(null);

  const submit = useCallback(() => {
    form
      .validateFields()
      .then((vals) => {
        const result = transform ? transform(vals) : vals;

        onOk?.(result)
          ?.then((res) => {
            if (res) onCancel?.();
            else throttledSubmitRef.current?.cancel();
          })
          .catch((error) => {
            if (process.env.NODE_ENV === 'development') console.warn(error);
            throttledSubmitRef.current?.cancel();
          });
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') console.warn(err);
      });
  }, [form, onOk, onCancel]);

  const throttledSubmit = useMemo(() => {
    const throttled = throttle(submit, throttleWait, { leading: true });
    throttledSubmitRef.current = throttled;
    return throttled;
  }, [submit, throttleWait]);

  const handleOk = useCallback(() => {
    if (throttleWait) return throttledSubmit();
    return submit();
  }, [throttledSubmit, submit, throttleWait]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  useEffect(() => {
    if (visible && dataSource) {
      const values = format ? format(dataSource as Record<string, any>) : dataSource;
      form.setFieldsValue(values);
    } else if (!visible) {
      form.resetFields();
    }
  }, [visible, dataSource, form]);

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      {...rest}
      className={classnames({
        [`${ClsPrefix}-modal-form`]: true,
        [classNameProp as string]: !!classNameProp,
      })}
      forceRender
    >
      <Form form={form} layout="vertical" {...formProps}>
        {children}
      </Form>
    </Modal>
  );
};

export default ModalForm;
