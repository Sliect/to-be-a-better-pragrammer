---
title: JsonSchemaForm
order: 5
---

## features

通过 json-schema 渲染表单。组件内置支持：

- input 输入框；
- textarea 文本框；
- input-number 年龄；
- radio 单选框；
- checkbox 多选框；
- select 下拉框；
- cascader 级联选择器；
- date-picker 日期选择器；
- range-picker 时间范围选择器；
- switch 开关；
- upload 上传；
- list 列表；

您可以通过 SchemaForm.register(name, FieldComponent) 注册表单控件。

- 支持联动显示隐藏；
- 支持联动获取远程数据。todo，获取数据后清空表单控件的值；
- 不支持列表内字段设置联动，无法感知哪一列数据；

## demos

### 基础示例

<code src="./schema-form/basic" />

### 注册组件

<code src="./schema-form/register" />

### 联动显示隐藏

<code src="./schema-form/when" />

### 联动获取远程数据

<code src="./schema-form/linked" />

### Antd.List

<code src="./schema-form/list" />

### Antd.List 水平布局

<code src="./schema-form/list-horizontal" />

### Antd.List 联动显隐

<code src="./schema-form/list-hidden" />

<API src="../../src/SchemaForm/components/SchemaForm/index.tsx"></API>
