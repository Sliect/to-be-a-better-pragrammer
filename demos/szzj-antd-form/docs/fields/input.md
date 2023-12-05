---
title: Input 输入框
---

# Input

输入框。

## features

- [antd 功能](https://ant.design/components/input-cn)，包含 Input、Passwrod、TextArea 组件；
- 内置 valueType 便捷开启字段校验；
- 关联校验能力；

### 内置校验能力

通过 valueType 启用内置的校验能力，支持：

- alphacn 英文、中文或下划线
- alphanumeric 数字、英文或下划线
- alphanumericcn 中文、英文字母、数字或下划线
- email 邮箱
- gerenal 数字、英文、中文或下划线
- idCard 身份证号
- ipv4 ipv4
- ipv6 ipv6
- mobileCn 手机号
- port 端口
- telephone 手机号或电话号
- uniscid 组织机构代码
- xss 预防 XSS 攻击

### 关联校验能力

扩展关联校验规则 rules，支持：

- greaterThen 填写数值大于另一个指定字段
- greaterThenEqual 填写数值大于等于另一个指定字段
- lessThen 填写数值小于另一个指定字段
- lessThenEqual 填写数值小于等于另一个指定字段

## demos

### 表单项

<code src="./input/field" />

### 详情

<code src="./input/detail" />

### 校验

<code src="./input/validate" />

### 关联校验

<code src="./input/relation" />

## Props 扩展

| 属性      |  类型  |    默认值 |     意义 |
| :-------- | :----: | --------: | -------: |
| valueType | string | undefined | 字段校验 |
