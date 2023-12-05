---
title: QueryForm
order: 8
---

## features

- 渲染查询表单

## demos

<code src="./query-form" />

## props

| 属性       |                          类型                           |                   默认值 |            意义 |
| :--------- | :-----------------------------------------------------: | -----------------------: | --------------: |
| form       |                      FormInstance                       |                undefined |      表单控制器 |
| layout     |                'horizontal', 'vertical'                 |             'horizontal' |        布局模式 |
| expandable |                      false, number                      |                    false |      是否可展开 |
| cols       |           number, { xs, sm, md, lg, xl, xxl }           | { lg: 2, xl: 3, xxl: 4 } |            列数 |
| onSearch   |                     (vals) => void                      |                undefined |            查询 |
| onReset    |                       () => void                        |                undefined |            重置 |
| formProps  |                        FormProps                        |                undefined | form 表单 props |
| btns       | React.ReactNode, ({ search, reset }) => React.ReactNode |                undefined |            按钮 |
