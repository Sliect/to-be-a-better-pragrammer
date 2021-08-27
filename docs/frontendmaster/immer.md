# Immer

## what

Immer（德语为：always）是一个小包，它允许您以更方便的方式处理不可变状态。它基于写时复制机制。

## why

Immer 基本思想是，您将所有更改应用到一个临时的 DraftState，它是 currentState 的代理。一旦你完成了所有的变更，Immer 将根据对草案状态的变更生成 nextState。这意味着您可以通过简单地修改数据来与数据交互，同时保留不可变数据的所有好处。

current => draft => nextState

```js
import produce from "immer";

// 1. current
const baseState = [
  {
    todo: "Learn typescript",
    done: true,
  },
  {
    todo: "Try immer",
    done: false,
  },
];

// 3. nextState
const nextState = produce(baseState, (draftState) => {
  // 2. draft
  draftState.push({ todo: "Tweet about it" });
  draftState[1].done = true;
});

// 不更改原状态
// baseState = [
//   {
//     todo: "Learn typescript",
//     done: true,
//   },
//   {
//     todo: "Try immer",
//     done: false,
//   },
// ];
// nextState = [
//   { todo: "Learn typescript", done: true },
//   { todo: "Try immer", done: true },
//   { todo: "Tweet about it" },
// ];
```
## how
