---
title: useModal
order: 3
---

# useModal

管理模态框显示隐藏状态，及模态框表单数据回显。

## features

- 支持内置表单。

## demos

### 基本使用

<code src="./use-modal/basic/index.tsx" />

### 模态框表单

<code src="./use-modal/form/index.tsx" />

## properties

useModal 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :-- | :-: | :-: | --: |
| options.form | FormInstance | undefined | ant design 表单实例，可操纵表单 |
| options.getValuesFromDataSource | (vals: any) => any | undefiend | 从 dataSource 获取注入表单的值 |

## apis

| 方法       |         类型         |                            意义 |
| :--------- | :------------------: | ------------------------------: |
| visible    |       boolean        |              模态框显示隐藏状态 |
| dataSource |          T           |              模态框内关联的数据 |
| show       | (record?: T) => void |                      展示模态框 |
| hide       |      () => void      |                      隐藏模态框 |
| form       |     FormInstance     | ant design 表单实例，可操纵表单 |
