---
title: ModalForm 弹窗表单
order: 6
---

# ModalForm 弹窗表单

## features

- 集成表单功能的弹窗，内部编排数据回显及点击确认逻辑；
- 集成节流处理逻辑，避免同一时间内多次点击提交；

## demos

### 基本

通常可结合 @szzj/hooks 提供的 [useModal](http://10.145.11.75:8080/gui/szzj-hooks/#/guide/use-modal) 钩子展示或隐藏弹窗。因此，ModalForm 约定：

- visible 展示隐藏弹窗；
- dataSource 表示外部数据源；
- onOk 表示点击确认按钮回调；
- onCancel 表示点击取消按钮或关闭时回调；

<code src="./modal-form" />

### 数据转换

可通过：

- format 转换回填到表单的数据；
- transform 转换提交的表单数据；

需注意，format 函数的执行时机为弹窗显示且外部数据源 dataSource 为真值时，

<code src="./modal-form/convert" />

### 异步数据

通常而言，可将业务弹窗独立拆分成一个组件。在这个组件的实现中，通过外部数据源 dataSource 获取远程数据，再行赋值到表单中。

<code src="./modal-form/async" />

### 节流

设置 throttleWait，可对提交操作进行节流，避免同一时间内多次点击。

<code src="./modal-form/throttle" />

## props

| 属性         |      类型       |    默认值 |                             意义 |
| :----------- | :-------------: | --------: | -------------------------------: |
| children     | React.ReactNode | undefined |                         弹窗内容 |
| dataSource   |       any       | undefined | 注入弹窗的数据，比如表格中的一行 |
| visible      |     boolean     | undefined |                     是否展示弹窗 |
| onCancel     |   () => void    | undefined |                 点击取消按钮回调 |
| onOk         |   () => void    | undefined |                 点击确认按钮回调 |
| form         |  FormInstance   | undefined |                       表单控制器 |
| transform    |  (vals) => any  | undefined |   数据提交时，前端数据转后端数据 |
| format       |  (vals) => any  | undefined |   数据回填时，后端数据转前端数据 |
| formProps    |    FormProps    | undefined |                 注入表单的 props |
| className    |     string      | undefined |                           样式类 |
| throttleWait |     number      | undefined |                         节流时间 |
