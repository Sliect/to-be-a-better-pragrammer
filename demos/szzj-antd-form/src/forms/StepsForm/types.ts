import type { FormInstance, FormProps } from 'antd/es/form';
import type { ButtonProps } from 'antd/es/button';
import type { StepProps } from 'antd/es/steps';

export type StepFormProps = Pick<
  StepProps,
  'title' | 'subTitle' | 'description' | 'icon' | 'status' | 'disabled'
> &
  FormProps & {
    /** 唯一标识 */
    name: string;
    children: React.ReactElement;
    stepProps?: StepProps;
    /** 是否无需按钮簇 */
    virtual?: boolean;
  };

export type Action = 'prev' | 'next' | 'changestep';

export type SaveAction = 'save' | 'next' | 'submit';

export type ButtonConfig = {
  /** 按钮排序 */
  order?: number;
  /** 是否启用按钮 */
  enable?: boolean;
  text?: string;
  props?: Omit<ButtonProps, 'onClick' | 'className'>;
};

export type StepsFormProps = {
  current?: number;
  formRef?: React.MutableRefObject<FormInstance<any> | undefined>;
  style?: React.CSSProperties;
  /** 下一步回调，返回 false 取消切换页面 */
  onNext: (
    values: any,
    other: { current: number; values: any },
  ) => Promise<false | undefined> | void;
  /** 上一步回调，返回 false 取消切换页面 */
  onPrev: () => Promise<false | undefined> | void;
  /** 取消按钮回调 */
  onCancel: () => void;
  /** 提交按钮回调 */
  onSave: (values: any, other: { current: number; values: any }) => void;
  /** 提交按钮回调 */
  onSubmit: (values: any, other: { current: number; values: any }) => void;
  /** 步骤条变更回调 */
  onStepChange?: (nextStep: number) => void;
  /** 步骤条、上一步、下一步变更回调 */
  onChange?: (
    nextStep: number,
    other: { current: number; currentValues: any; values: any; action: Action },
  ) => void;
  onFormChange?: (name: string, info: any) => void;
  onFormFinish?: (name: string, info: any) => void;
  children: React.ReactElement[];
  /** 尾部按钮簇 */
  footerRender?: (props: {
    current: number;
    buttons: React.ReactElement[];
  }) => React.ReactElement;
  /** 底部按钮配置 */
  buttonConfig?: {
    prev?: ButtonConfig;
    next?: ButtonConfig;
    save?: ButtonConfig;
    submit?: ButtonConfig;
    cancel?: ButtonConfig;
  };
};

export type ContentRefType = {
  submit: (
    vals: any,
    options: {
      current: number;
      values: any;
      action: SaveAction;
    },
  ) => Promise<any>;
};

export type RefType = {
  submit: (options: { action: SaveAction }) => Promise<any>;
  valuesRef: React.MutableRefObject<any>;
  formRef: React.MutableRefObject<FormInstance<any> | undefined>;
  contentRef: React.MutableRefObject<ContentRefType | null>;
};
