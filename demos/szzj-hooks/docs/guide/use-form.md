---
title: useForm
order: 5
---

# useForm

仿 antd3 处理表单的 hooks，可用于对接 antd-mobile。全量重绘，性能方面逊色于 antd4 的增量重绘；且 antd3 FormItem 更新校验状态依赖于全量重绘。字段变更时，@szzj/hooks 会驱动表单的重绘流程，同时销毁字段时会有两次重绘。不支持滚动到校验失败节点。

## features

- 支持 namepath 形式注册、更新字段。
- 提供 validateFields 方法校验字段。
- 提供 getFieldDecorator 方法注册字段。
- 提供 registerField、unRegisterField 方法注册字段。
- 提供 isFormChanged 方法判断表单是否变更。
- [TODO] 支持校验中状态。
- [TODO] 性能优化。

## demos

### demo 1: getFieldDecorator

<code src="./use-form/getFieldDecorator/index.tsx" />

### demo 2: registerField

<code src="./use-form/registerField/index.tsx" />

## usage

```jsx | pure
import { useForm } from '@szzj/hooks';

const form = useForm();
const { validateFields } = form;
```

## properties

useForm 参数。

| 属性           |         类型          |    默认值 |
| :------------- | :-------------------: | --------: |
| onValuesChange | (values: any) => void | undefined |

## apis

| 方法 | 类型 | 意义 |
| :-- | :-: | --: |
| registerField | (name: string, meta?: FieldMeta) => void | 注册字段，返回 unRegisterField |
| unRegisterField | (name: string) => void | 销毁字段 |
| setFieldMeta | (name: string, key: string \| any, value?: any) => void | 设置字段的元数据 |
| getFieldMeta | (name: string, key?: string) => any | 获取字段的元数据 |
| getFieldDecorator | (name: string, meta: FieldMeta) => (inst: React.ReactElement) => React.ReactElement; | 字段组件的装饰器 |
| getFieldRef | (name: string) => any | 获取字段的 ref 引用，配合 getFieldDecorator 使用有效 |
| getFieldsValue | () => Fields | 获取字段的值 |
| getFieldValue | (name: string) => any | 获取字段的值 |
| getFieldInitialValue | (name: string) => any | 获取字段的初始值 |
| getFieldsError | () => Errors | 获取校验文案 |
| getFieldError | (name: string) => undefined | string[] | 获取校验文案 |
| setFieldValue | (name: string, value: any) => void | 设置字段的值 |
| setFieldsValue | (vals: Fields) => void | 设置字段的值 |
| resetFields | () => void | 置回初始值 |
| validateField | (name: string, value?: any) => Promise<Fields\> | 校验字段 |
| validateFields | (names?: string[]) => Promise<Fields\> | 校验字段 |
| isFormChanged | () => boolean | 判断表单是否变更 |
| isFieldTouched | (name: string) => boolean | 是否设置过字段的值 |
| isFieldsTouched | () => boolean | 是否设置过字段的值 |
