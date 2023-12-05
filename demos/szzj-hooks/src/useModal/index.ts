import { useCallback, useState, useEffect, useMemo } from 'react';
import useRealtimeRef from '../useRealtimeRef';
import { Options, Modal } from './types';

/**
 * 管理模态框显示隐藏状态，及模态框表单数据回填
 * @param options options.form ant design 的 FormInstance 示例，可操纵表单
 * @param options options.getValuesFromDataSource 从 dataSource 中获取表单展示数据
 * @param options options.onSubmit 点击确认后调用
 * @returns visible 模态框显示隐藏状态
 * @returns dataSource 模态框展示实体数据
 * @returns loading 是否提交过程中
 * @returns show 显示模态框，条件设置模态框展示实体数据
 * @returns hide 隐藏模态框
 * @returns submit 提交
 * @returns form ant design 的 FormInstance 示例，可操纵表单
 * @returns props 模态框、抽屉渲染时常用 props 聚合
 */
const useModal = <T>(options?: Options<T>): Modal<T> => {
  const { form, format, onSubmit } = options || ({} as Options<T>);
  // 实时缓存最新的销毁函数
  const onSubmitRef = useRealtimeRef(onSubmit);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const show = useCallback((record?: T) => {
    if (record) setDataSource(record);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setDataSource(undefined);
  }, []);

  const submit = useCallback(
    (vals: Record<string, any>) => {
      return new Promise(
        (resolve: (res: { success?: boolean; [key: string]: any }) => void, reject) => {
          if (onSubmitRef.current) {
            setLoading(true);

            onSubmitRef
              .current(vals, dataSource)
              .then((res: { success?: boolean; [key: string]: any }) => {
                setLoading(false);

                if (res) {
                  // { success } 格式自动隐藏
                  if (res.success) hide();
                  resolve(res);
                } else {
                  setLoading(false);
                  reject();
                }
              })
              .catch(() => {
                setLoading(false);
                reject();
              });
          }
        },
      );
    },
    [dataSource],
  );

  const props = useMemo(() => {
    return {
      visible,
      dataSource,
      loading,
      onCancel: hide,
      onOk: submit,
    };
  }, [visible, dataSource, loading, hide, submit]);

  useEffect(() => {
    if (!form) return;

    if (visible) {
      if (dataSource) {
        const values = format ? format(dataSource) : dataSource;
        form.setFieldsValue(values);
      }
    } else {
      form.resetFields();
    }
  }, [form, visible]);

  return {
    visible,
    dataSource,
    loading,
    show,
    hide,
    submit,
    form,
    props,
  };
};

export default useModal;
