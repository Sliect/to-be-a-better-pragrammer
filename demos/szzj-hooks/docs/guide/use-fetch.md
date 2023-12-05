---
title: useFetch
order: 1
---

# useFetch

处理远程请求的轻便 hooks，通常需要结合 umi-request、axios 等请求库使用。

## features

- 支持手动触发。

## usage

```jsx | pure
import { useFetch } from '@szzj/hooks';

const { loading, data, fetch: submit } = useFetch(
  (params) => {
    // handle request, return promise
  },
  {
    // manual: true,// 是否手动触发，默认为否
  },
);
```

## demos

### 基本使用

<code src="./use-fetch/basic/index.tsx" />

### 手动请求

<code src="./use-fetch/manual/index.tsx" />

### 是否使用 data && 失败后的默认返回值

<code src="./use-fetch/defaultData/index.tsx" />

## properties

useFetch 参数。

| 属性                |        类型         |    默认值 |                  意义 |
| :------------------ | :-----------------: | --------: | --------------------: |
| request             | (params) => Promise | undefined |              请求方法 |
| options             |       object        | undefined |                  选项 |
| options.manual      |       boolean       | undefined |          是否手动触发 |
| options.usedata     |       boolean       | undefined | 是否使用返回 res.data |
| options.defaultData |         any         | undefined |    失败后的默认返回值 |
