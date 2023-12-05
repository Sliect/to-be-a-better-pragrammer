---
title: Cascader 级联下拉框
---

# Cascader

级联下拉框一般用于省市区三级联动等场景。

## features

- antd 功能
- LazyCascader 支持逐级拉取数据
- AuthedCascader 受限的级联下拉框，适用于地市级管理员只能选择所属地市下的区县

## demos

### demo 1: 表单项

<code src="./cascader/field" />

### demo 2: 详情

<code src="./cascader/detail" />

### demo 3: 逐级拉取

使用 LazyCascader 级联下拉框可以逐级拉取远程数据。默认情况下，你需要在接口层将后端返回数据转换成 { label, value, isLeaf } 节点形式，表单存储的值是选中节点列表。当然，你可以通过 fieldNames 设置 key 键。

需要注意的是，对逐级拉取的数据，通常需要后端将 label 也存入数据库中（或者在接口层中进行转换），以便在详情中展示。

<code src="./cascader/lazy" />

### demo 2: 受限级联

使用 AuthedCascader 可以渲染带权限控制的级联下拉框。比如杭州市管理员只能选择杭州市下的区，不能切换到浙江省或其他地市。

<code src="./cascader/authed" />
