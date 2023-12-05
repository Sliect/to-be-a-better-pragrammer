import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { Drawer, Button } from 'antd';
import 'antd/es/drawer/style/index.js';
import 'antd/es/button/style/index.js';
import classnames from 'classnames';
import { throttle } from '@szzj/utils';
import Form from '../../Form';
import { ClsPrefix } from '../../consts';
import './index.less';

import type { DrawerFormProps } from './types';

/**
 * 抽屉表单
 * @param param0
 * @returns
 */
const DrawerForm: React.FC<DrawerFormProps> = ({
  form: formProp,
  dataSource,
  visible,
  transform,
  format,
  okText,
  cancelText,
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

  const handleClose = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  useEffect(() => {
    if (visible && dataSource) {
      const values = format ? format(dataSource) : dataSource;
      form.setFieldsValue(values);
    } else if (!visible) {
      form.resetFields();
    }
  }, [visible, dataSource, form]);

  return (
    <Drawer
      open={visible}
      onClose={handleClose}
      maskClosable={false}
      width={600}
      footer={
        <div style={{ float: 'right' }}>
          <Button onClick={handleClose}>{cancelText || '取消'}</Button>
          <Button type="primary" onClick={handleOk} style={{ marginLeft: 10 }}>
            {okText || '确认'}
          </Button>
        </div>
      }
      {...rest}
      className={classnames({
        [`${ClsPrefix}-drawer-form`]: true,
        [classNameProp as string]: !!classNameProp,
      })}
      forceRender
    >
      <Form form={form} layout="vertical" {...formProps}>
        {children}
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
