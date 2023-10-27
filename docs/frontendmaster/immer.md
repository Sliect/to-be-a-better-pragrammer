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

前置知识

Proxy的 handler 即 traps 支持的拦截行为如下，第一位参数都是 target，后面才是正常调用方法的传参：

handler.apply()

handler.construct()

handler.defineProperty()

handler.deleteProperty()

handler.get()

handler.getOwnPropertyDescriptor()

handler.getPrototypeOf()

handler.has()  针对 in 操作符的代理方法

handler.isExtensible()  代理 Object.isExtensible 方法

handler.ownKeys()  代理 Reflect.ownKeys 方法 显示所有属性，也可以拦截 Object.keys() 只显示对象自身可枚举的属性

handler.preventExtensions()  代理 Object.preventExtensions 方法，阻止对象的属性增删操作

handler.set() 

handler.setPrototypeOf()  代理 Object.setPrototypeOf 方法

Reflect 是js内置的一个对象，提供了对象操作方法，和Proxy的handler上操作方法一致

```ts
// 主流程简化
function produce(base, recipe) {
  // 如果是纯对象
  if (isDraftable(base)) {
    // 创建一个作用域上下文，后面根据上下文可以还原出值
    const scope = enterScope(this)
    // 创建代理对象
    const proxy = createProxy(base, undefined)
    let hasError = true
    try {
      // 对代理对象进行操作，可能会对代理对象进行修改
      result = recipe(proxy)
      hasError = false
    } finally {
      // 如果有错误，撤销代理
      if (hasError) revokeScope(scope)
      // 变更作用域的上下文
      else leaveScope(scope)
    }
    // 合并最终结果，让变更的代理部分变成修改后的值
    return processResult(result, scope)
  }
}
```

```ts
const state: ProxyState = {
  // 用于指示状态的类型，可以是数组或对象
  type_: isArray ? ArchType.Array : (ArchType.Object as any),
  // 用于跟踪与该状态相关联的produce调用创建的所有代理对象，以便在最终处理（finalize）阶段对这些代理对象进行处理。在最终处理阶段，immer会遍历scope.drafts_中的所有代理对象，将对应的修改应用到原始对象上，从而实现状态的更新
  scope_: parent ? parent.scope_ : getCurrentScope()!,
  // 用于标记状态是否已经被修改
  modified_: false,
  // 在最终处理期间使用的标志，表示状态是否已经被最终处理
  finalized_: false,
  // 跟踪哪些属性已经被赋值（true）或删除（false）
  assigned_: {},
  // 存储父级draft状态
  parent_: parent,
  // 原值
  base_: base,
  // 代理对象
  draft_: null as any, 
  // 更新后的值
  copy_: null,
  // 取消代理对象的方法
  revoke_: null as any,
  // 是否是手动修改
  isManual_: false
}

let target: T = state as any
let traps: ProxyHandler<object | Array<any>> = objectTraps
if (isArray) {
  target = [state] as any
  traps = arrayTraps
}
// 创建一个可撤销的代理对象
// target 是被代理的对象
// traps 是一系列代理行为的回调函数
const { revoke, proxy } = Proxy.revocable(target, traps)
state.draft_ = proxy as any
state.revoke_ = revoke
```

```ts
const objectTraps: ProxyHandler<ProxyState> = {
	get(state, prop) {
    // 这里劫持了Symbol(immer-state)，用来判断是否是 immer 的 proxy
		if (prop === DRAFT_STATE) return state

		const source = latest(state)
    // 不存在时去原型链上查找，不会代理原型链上的操作
		if (!has(source, prop)) {
			return readPropFromProto(state, source, prop)
		}
		const value = source[prop]
    // 基本类型直接返回
		if (state.finalized_ || !isDraftable(value)) {
			return value
		}
		// immer是在代理对象的属性被访问时，才会去动态地创建代理对象
		if (value === peek(state.base_, prop)) {
      // 浅拷贝到 copy_ 上
			prepareCopy(state)
			return (state.copy_![prop as any] = createProxy(value, state))
		}
		return value
	},
	has(state, prop) {
		return prop in latest(state)
	},
	ownKeys(state) {
		return Reflect.ownKeys(latest(state))
	},
	set(
		state: ProxyObjectState,
		prop: string /* strictly not, but helps TS */,
		value
	) {
    // 属性的描述符通常存在于对象的原型链上
    // 如果存在setter函数，说明该属性是一个拦截器属性，对其进行设置操作需要调用setter函数
		const desc = getDescriptorFromProto(latest(state), prop)
    // 描述符存在且有setter函数
		if (desc?.set) {
			desc.set.call(state.draft_, value)
			return true
		}
    // 状态没被修改过
		if (!state.modified_) {
			const current = peek(latest(state), prop)
			const currentState: ProxyObjectState = current?.[DRAFT_STATE]
      // currentState是代理对象，要设置的值和原始值相同
			if (currentState && currentState.base_ === value) {
				state.copy_![prop] = value
				state.assigned_[prop] = false
				return true
			}
      // 要设置的值相同，且不是 undefined 或被显式的设置为 undefined
			if (is(value, current) && (value !== undefined || has(state.base_, prop)))
				return true
			prepareCopy(state)
			markChanged(state)
		}

		if (
			(state.copy_![prop] === value &&
				// special case: handle new props with value 'undefined'
				(value !== undefined || prop in state.copy_)) ||
			// special case: NaN
			(Number.isNaN(value) && Number.isNaN(state.copy_![prop]))
		)
			return true

		// @ts-ignore
		state.copy_![prop] = value
		state.assigned_[prop] = true
		return true
	},
	deleteProperty(state, prop: string) {
		// 如果在原值上已存在
		if (peek(state.base_, prop) !== undefined || prop in state.base_) {
			state.assigned_[prop] = false
			prepareCopy(state)
			markChanged(state)
		} else {
			// 如果原值上就不存在，直接在最终阶段之前删除即可
			delete state.assigned_[prop]
		}
		if (state.copy_) {
			delete state.copy_[prop]
		}
		return true
	},
	// Note: We never coerce `desc.value` into an Immer draft, because we can't make
	// the same guarantee in ES5 mode.
	getOwnPropertyDescriptor(state, prop) {
		const owner = latest(state)
		const desc = Reflect.getOwnPropertyDescriptor(owner, prop)
		if (!desc) return desc
		return {
			writable: true,
			configurable: state.type_ !== ArchType.Array || prop !== "length",
			enumerable: desc.enumerable,
			value: owner[prop]
		}
	},
	defineProperty() {
		die(11)
	},
	getPrototypeOf(state) {
		return getPrototypeOf(state.base_)
	},
	setPrototypeOf() {
		die(12)
	}
}
```
