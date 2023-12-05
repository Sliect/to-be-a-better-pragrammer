---
title: EditableTable
order: 3.1
---

## features

- 可编辑表格

## demos

### demo: 无分页

<code src="./editable-table/nopagination" />

### demo: 自定义操作列

<code src="./editable-table/customAction" />

### demo: 参数配置器

本示例为 开放域-网关 中的参数配置器。

<code src="./editable-table/requestParams" />

### demo: 出参选择器

本示例为 开放域-网关 中的出参选择器部分。该示例用于说明联动对子孙节点设置值。

<code src="./editable-table/responseParams" />

## props

### column 扩展

| 属性                    |  类型   |    默认值 |                        意义 |
| :---------------------- | :-----: | --------: | --------------------------: |
| uniqued                 | boolean | undefined | 同一层级同一值只能配置 1 次 |
| inherit                 | boolean | undefined |    子节点的值是否继承父节点 |
| changeWithChildrenValue | boolean | undefined |    改变值是否递归改变子节点 |
