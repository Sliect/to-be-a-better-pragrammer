---
title: useImmer
order: 8
---

# useImmer

不可变数据。

## features

- immer的结构是共享的，currentState 和 nextState 共享未修改的部分。
- useEffect 需要深比较时可以使用 immer。
- immer 会冻结数据，防止数据被篡改，也方便数据的回溯。
- immer 写法更优雅。

## demos

### useImmer

<code src="./use-immer/useImmer.tsx" />

### useImmerReducer

<code src="./use-immer/useImmerReducer.tsx" />

## properties

useImmer 参数。

| 属性        |         类型          |    默认值 |                意义 |
| :---------- | :-------------------: | --------: | ----------------: |
| base        |         any           | undefined |       基础状态     |
| recipe      |      ?: any           | undefined |  更改基础状态的配方 |
