---
title: Select 下拉框
---

# Select

下拉框。

## features

- antd 功能
- SelectWithOther 带有其他选项的快捷下拉框
- searchable 自动远程搜索功能，搜索时带防抖

## demos

### demo: 表单项

<code src="./select/field" />

### demo: 分组

<code src="./select/opt-group" />

### demo: 详情

<code src="./select/detail" />

### demo: 其他

<code src="./select/with-other" />

### demo: 搜索

当 options 为函数，且设置 props.searchable 属性为 true 时，Select 将自动开启远程搜索功能。options 实现上需要自行处理 Select 搜索数据。

<code src="./select/search" />

### Select

<API hideTitle src="../../src/fields/Select/Select/index.tsx"></API>

### SelectWithOther

<API hideTitle src="../../src/fields/Select/SelectWithOther/index.tsx"></API>
