---
title: useList
order: 4
---

# useList

管理列表增删、移动、交互位置、全量设置。

## features

- 支持增加、删除。
- 支持编辑。
- 支持交换位置。
- 支持移动。

## demos

### 增删

<code src="./use-list/add/index.tsx" />

### 编辑

<code src="./use-list/edit/index.tsx" />

### 交换位置

<code src="./use-list/exchange/index.tsx" />

### 移动

<code src="./use-list/move/index.tsx" />

### demo 4: setList

<code src="./use-list/setlist/index.tsx" />

## properties

useFetch 参数。

| 属性        |         类型          |    默认值 |           意义 |
| :---------- | :-------------------: | --------: | -------------: |
| defaultList |         any[]         |        [] |       默认列表 |
| onChange    | (list: any[]) => void | undefined | 列表变更时回调 |

## apis

| 方法     |                        类型                        |     意义 |
| :------- | :------------------------------------------------: | -------: |
| list     |                       any[]                        | 列表数据 |
| add      |                (item: any) => void                 | 添加一项 |
| remove   |                (item: any) => void                 | 移除一项 |
| edit     |         ((item: any) => boolean, newItem)          | 编辑一项 |
| exchange | (sourceIndex: number, targetIndex: number) => void |     交换 |
| move     | (sourceIndex: number, targetIndex: number) => void |     移动 |
| setList  |              (newList: any[]) => void              | 全量修改 |
