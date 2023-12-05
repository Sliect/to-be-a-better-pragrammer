---
title: StepsForm
order: 9
---

## features

- 分步表单

## demos

### 简单用法

<code src="./steps-form" />

### 联动用法

<code src="./steps-form/complexStepForm.tsx" />

### footerRender

<code src="./steps-form/footerRender.tsx" />

### virtualStep

#### virtual 使用之后，前一步按钮会自动变成最后的 submit

<code src="./steps-form/virtualStep.tsx" />

## props

| 属性         |                 类型                 |    默认值 |                                意义 |
| :----------- | :----------------------------------: | --------: | ----------------------------------: |
| current      |                number                | undefined |                          步骤控制器 |
| formRef      |             FormInstance             | undefined |                          表单控制器 |
| onNext       |          (vals) => Promise           | undefined | 下一步回调，返回 false 取消切换页面 |
| onPrev       |            () => Promise             | undefined | 上一步回调，返回 false 取消切换页面 |
| onSave       |          (vals) => Promise           | undefined |                        保存按钮回调 |
| onSubmit     |          (vals) => Promise           | undefined |                        提交按钮回调 |
| onCancel     |              () => void              | undefined |                        取消按钮回调 |
| onStepChange |      (nextStep: number) => void      | undefined |                      步骤条变更回调 |
| onChange     |      (nextStep: number) => void      | undefined |              上一步、下一步变更回调 |
| buttonConfig | { prev, next, save, submit, cancel } | undefined |                        底部按钮配置 |
