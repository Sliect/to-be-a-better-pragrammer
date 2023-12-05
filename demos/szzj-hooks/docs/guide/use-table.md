---
title: useTable
order: 2
---

# useTable

对接 ant-design 表格或分页列表等组件。

## features

- 支持远程加载数据。
- 支持结合 antd Table 组件作字段排序、过滤。
- 支持前端伪分页（伪分页情形下不支持字段排序和过滤）。
- 支持带搜索框。
- 支持列选择。

## demos

### 基本使用

<code src="./use-table/basic/index.tsx" />

### 过滤排序

<code src="./use-table/sort/index.tsx" />

### 前端伪分页

<code src="./use-table/fake/index.tsx" />

### 搜索

<code src="./use-table/search/index.tsx" />

### 行选择

<code src="./use-table/selection/index.tsx" />

## properties

useTable 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :-- | :-: | --: | --: |
| request | (params: any) => Promise | undefined | 请求方法 |
| options.defaultParams | any | undefined | 默认参数 |
| options.useFetchOptions | object | undefined | useFetch 配置项 |
| options.enableRowSelection | boolean | false | 开启选择 |
| options.enableFakePagination | boolean | false | 伪分页 |
| options.enableSuccessLog | boolean | false | 打印成功日志 |
| options.enableFailLog | boolean | true | 打印失败日志 |
| options.transfrom | (data: any, pagination) => { pagination, list } | undefined | 转换响应 |
| options.transfromParams | (params) => any | undefined | 转换请求 |

## apis

| 方法 | 类型 | 意义 |
| :-- | :-: | --: |
| params | object | 请求参数 |
| searchFields | object | 查询表单参数 |
| search | (...args: any[]) => Promise | 基于原有的分页数据进行查询，查询数据会被重置 |
| research | (...args: any[]) => Promise | 基于原有的查询数据进行查询，查询数据不会被重置 |
| reset | () => void | 重置，基于默认查询数据进行查询 |
| getSelectedRowKeys | () => string[] | 获取选中列的 key 键列表 |
| clearSelectedRowKeys | () => void | 重置选中项 |
| props | object | 注入 Table 组件的 props |
| props.dataSource | object[] | 数据列表 |
| props.pagination | object | 分页信息 |
| props.loading | boolean | 数据是否加载中 |
| props.onChange | (pagination, filters, sorter) => void | Table 组件的 onChange 绑定事件 |
| props.rowSelection | string[] | 选中列的 key 键列表 |
