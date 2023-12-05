---
nav:
  title: 手册指南
  order: 2
title: 水平分层模式下如何做好可复用性
order: 2
group:
  title: 应用开发参考手册
  order: 2
---

## 水平分层模式下如何做好可复用性

垂直模型有利于 ui、逻辑的复用，但是对代码质量、程序设计、业务了解程度都有比较高的要求，具体实施难度比较大。类似的领域驱动模型（DDD）在后端似乎也很难执行，前端实践就更少了，参考文章：[前端开发-领域驱动设计](https://www.yuque.com/mayiprototeam/gfyt69/oq14ia)。

水平分层模式下，天生的会隔离掉可复用的模块，业务逻辑+组件的复用，components-bizs 是比较折中且符合一般思维，但是业务组件的抽离可能是迭代到了一定程度才产生的，就需要我们前期对组件的抽离铺平道路：

- 禁止状态的层层传递，不用回调
- 业务逻辑集中处理，不掺杂在组件内
- hooks 按功能拆分

以\*\*管理页面为例，主要功能包含三大块：查询列表、新增编辑、详情展示。
hooks 就可以这么处理：
---index.ts
---useList.ts
---useEdit.ts
---useDetail.ts

index.ts 不处理具体逻辑，它负责的是主流程如新增、修改、查询，但是像新增表单的校验、数据转换、列表刷新等，是交给具体模块的 hooks 去处理的。而 onAdd 函数内部，组合 useList、useEdit，并且做一些简单的参数传递、新增完成给个 message 提示等...

```ts | pure
const listHooks = useList();
const editHooks = useEdit();

function onAddBtnClick(data) {
  editHooks.showAddModal(data);
}

async function onSubmit() {
  const success = await editHooks.submit();
  if (success) {
    editHooks.hideAddModal();
    listHooks.reFlesh();
    message.success('新增成功');
  } else {
    message.error('新增失败');
  }
}

return {
  onAddBtnClick,
  onSubmit,
  listHooks,
  editHooks,
};
```

状态传递可以借助 context 等，这里以 unstated-next 为例：

1. 将整个页面放在 Provider 下，hooks 中状态共享（不用担心性能问题，99.9%都没问题，剩下的出现了再解决，过早考虑性能是一种负担）

```tsx | pure
<Container.Provider>
  <Page />
</Container.Provider>
```

2. 内部组件直接使用 useContainer 来导入 state 或 hooks 方法

```tsx | pure
export default () => {
  const {
    onSubmit,
    editHooks: { visible },
  } = hooks.useContainer();
  return <Modal visible={visible} onOk={onSubmit} />;
};
```

甚至一个很独立完全可以抽离的组件，你都可以先按这种方式书写，无非是后面把导出的状态提取到 props 中，或者连对应 hooks 一起抽离，因为它们本身就是 UI 与逻辑的组合，没有特别强的依赖关系，前期唯一要考虑的就是 hooks 的职责划分（如果要抽象业务逻辑的话）。
