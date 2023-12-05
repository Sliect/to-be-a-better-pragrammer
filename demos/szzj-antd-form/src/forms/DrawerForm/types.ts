import type { DrawerProps } from 'antd/es/drawer';
import type { FormInstance, FormProps } from 'antd/es/form';

/**
 * 抽屉表单 Props
 */
export type DrawerFormProps = Omit<DrawerProps, 'visible'> & {
  /** 表单控制器 */
  form?: FormInstance<any>;
  /** 外部数据源 */
  dataSource?: any;
  /** 显示隐藏状态 */
  visible?: boolean;
  /** 取消回调 */
  onCancel?: () => void;
  /** 提交数据，需要主动隐藏弹窗 */
  onOk?: (vals: any) => Promise<any>;
  /** 提交数据转换 */
  transform?: (vals: any) => any;
  /** 后端数据转换 */
  format?: false | ((vals: any) => any);
  /** 确认按钮文案 */
  okText?: string;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 子节点 */
  children: React.ReactNode;
  /** 表单 props */
  formProps?: FormProps;
  /** 样式类 */
  className?: string;
  /** 节流时间 */
  throttleWait?: number;
};
