---
title: Input 输入框
order: 1
group:
  title: Components 组件
  order: 1
---

# Input 输入框

这是一个输入框组件。

## Demos

<code src="./inputs/value.tsx" description="受控模式控制表单项的值">受控模式</code>

<code src="./inputs/defaultValue.tsx" description="非受控模式设置初始值">非受控模式</code>

## Props

### 手写

| 属性名       | 描述                | 类型                      | 默认值    |
| ------------ | ------------------- | ------------------------- | --------- |
| value        | 受控模式 value 值   | `string`                  | undefined |
| defaultValue | 非受控模式 value 值 | `string`                  | undefined |
| onChange     | 事件监听            | `(value: string) => void` | undefined |
