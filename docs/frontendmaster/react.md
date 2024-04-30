# React

## 组件&props

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

1. react 将调用 render 函数，并将 Welcome 传入作为参数
2. 将{name: 'Sara'}作为 props 传入，并调用 Welcome 组件
3. Welcome 将返回 h1 元素
4. 高效更新 h1 元素

单向数据流 不允许修改 props props 仅只读

## state&生命周期

state 和 props 类似，但是 state 是私有的，并完全受控于当前组件

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

1. 调用 ReactDOM.render 函数，调用 Clock 的构造函数，初始化 this.state
2. 调用 Clock 的 render 方法
3. Clock 被挂载到 root 节点上，并调用 componentDidMount 生命周期，每秒更新 state
4. react 监听 state 的改变重新渲染 render 方法以更新 DOM
5. Clock 组件被移除，调用 componentWillUnmount 生命周期，停止定时器

## 事件处理

1. e.preventDefault() 阻止默认行为
2. this 指向，推荐在 constructor 里 bind
3. 若需要传递参数可以在事件回调上 bind 函数里传参，如

```ts
onClick={this.deleteRow.bind(this, id)}
```

合成事件的实现机制

1. 事件委派

绑定到结构的最外层，使用一个统一的事件监听器，在监听器上维持一个映射来保存所有组件内部的事件监听和处理函数。

2. 自动绑定

每个方法的 this 会自动绑定到该组件实例上。在 class 上自动绑定失效，需要手动去绑定

## 列表&key

1. 如果列表的顺序可能发生变化，不推荐使用 index 作为下标
2. key 不会传递给组件，如果需要获取到 key 值，使用其他属性名单独进行传递

## 表单

表单受控组件的值始终由 state 驱动

## 状态提升

自上而下的数据流，仅有组件自己能修改自己的 state

## react 哲学

1. 划分各个组件和层级
2. 根据划分的组件创建不包含交互功能的版本，目前只有 render 方法，且不需要 state
3. 列出所有数据，判断是否是 state
4. 确定 state 放置的位置
5. 添加反向数据流

## Context

共享组件树的全局数据，避免通过中间元素传递 props

```js
// 每一个Context对象都会返回一个Provider React组件
// Provider接收一个value属性，传递给消费组件
// 如果传递的是一个对象，在对象里传递值和更改值的回调，即可完成在consumer组件更新context对象
// 当Provider的value值发生变化时，内部所有的消费组件都会重新渲染
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 挂载完才能通过 this.context 消费最近Context对象上的值
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## 错误边界

捕捉子组件的错误，防止其他部分不崩溃

```js
// class组件定义static getDerivedStateFromError() 或 componentDidCatch()时
// 其变成一个错误边界
// getDerivedStateFromError() 渲染备用UI
// componentDidCatch() 打印错误信息
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## ref 转发

React.forwardRef 可以转发 ref

## 高阶组件

1. 使用组合而不是更改原组件，也不要去更改其原型
2. 不要在 render 中使用 HOC

```js
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```

3. 复制静态方法

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  // 自动拷贝所有非 React 静态方法
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

## Portals

将子组件渲染到父组件以外的 DOM 节点

```js
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  )
}
```

## Render Props

render prop 是一个用于告知组件需要渲染什么内容的函数 prop

## PropTypes

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message),
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function (
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' +
          propFullName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  }),
};
```

## hooks

1. 在不编写 class 的情况下，使用 state 以及其他特性，hook 不能在 class 里使用
2. useEffect 当作 componentDidMount, componentDidUpdate, componentWillUnmount 的组合
3. 副作用分无需清除的和需要清除两种，清除副作用的在 useEffect 里 return 清除副作用的函数
4. 跳过 Effect 进行性能优化

```js
useEffect(() => {
  document.title = `you click ${count} times`;
}, [count]); // 仅在 count 更新时更新
// 如果第二个参数为 [], 表示effect不依赖props或state中的任何值，仅在组件挂载和卸载时执行
```

5. react 靠 hook 的调用顺序知道哪个 state 对应哪个 useState，因此必须保证 hook 的调用顺序在每次渲染中都相同
6. 避免循环，条件或嵌套函数中调用 hook，如果想要有条件的执行一个 effect，可以将判断放到 hook 内部
7. 自定义 Hook 以 use 开头
8. useReducer 适用于 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

## useEffect 完全指南

把不依赖 props 和 state 的函数提取到组件外面，把仅被 effect 使用的函数放到 effect 里。如果 effect 还是用到了组件内的函数（如 props 传进来的函数），可以在定义它们的地方用 useCallback 包一层。防止这些函数访问到 props 和 state，参与到数据流中。

React 会记住你提供的 effect 函数，并且会在每次更改作用于 DOM 并让浏览器绘制屏幕后去调用它

React 在单次渲染的范围内不会修改 props 和 state, 如果想在 effect 里获取最新的值而不是捕获的值, 可以使用 ref

React 识别不了新旧 effect 的不同，只会根据依赖是否改变来判断是否在浏览器绘制屏幕后去调用

第一次绘制 -> 第一次调用 effect 函数 -> 第二次绘制 -> 清除第一次的 effect 函数 -> 第二次调用 effect 函数 ->...

useLayoutEffect 回调会在绘制前执行，读取 DOM 布局并同步触发重渲染，但是有可能会阻塞视觉更新

```js
// 当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }); // Instead of setCount(c => c + step); step作为依赖会每次移除新增计时器
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

useReducer 可以把更新逻辑和描述发生了什么分开，用来移除 effect 中不必需的依赖，避免不必要的 effect 调用

useEffect 就是关注数据流的改变，拥抱同步的思想

useCallback 本质上是添加了一层依赖检查，我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖

用 useCallback 缓存函数，再把缓存的函数作为 useEffect 的依赖

## react fiber

fiber 是一种工作单元

单处理器进程调度策略

- 先到先得 （排队阻塞）

- 轮转 公平地给每一个进程一定的执行时间，当时间消耗完毕或阻塞，操作系统就会调度其他进程，将执行权抢占过来。

- 最短进程优先

- 最短剩余时间

- 最高响应比优先 优化长进程的饥饿问题

> 响应比 = （等待执行时间 + 进程执行时间） / 进程执行时间

- 每个进程一开始都有相同的优先级，每次被抢占(需要配合其他抢占策略使用，如轮转)，优先级就会降低一级。因此通常它会根据优先级划分多个队列。

react fiber 的思想：React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

浏览器在一帧内执行任务的顺序

- 处理用户输入事件

- Javascript 执行

- requestAnimation 调用

- 布局 Layout

- 绘制 Paint

在每一帧之后空的时间片里穿插执行任务，

任务优先级

- Immediate(-1) - 这个优先级的任务会同步执行, 或者说要马上执行且不能中断

- UserBlocking(250ms) 这些任务一般是用户交互的结果, 需要即时得到反馈

- Normal (5s) 应对哪些不需要立即感受到的任务，例如网络请求

- Low (10s) 这些任务可以放后，但是最终应该得到执行. 例如分析通知

- Idle (没有超时时间) 一些没有必要做的任务 (e.g. 比如隐藏的内容), 可能会被饿死

旧版 将所有 vdom 递归遍历完成后才能给出补丁传递给 renderer 进行渲染,然后屏幕上才能显示此次更新内容

新版 Scheduler（调度） 并不是所有 state 的更新需要立即显示出来，并不是所有更新优先级都是一样的，优先相应高优先级的任务

函数调用栈中每个函数是一个工作，每个工作被称为堆栈帧，它会一直工作，直到堆栈为空，无法中断。fiber 类比为函数，其特性是时间分片和暂停

### how?

1. Reack.renderDOM()或者 setState 的时候开始创建更新

2. 将创建的更新加入任务队列，等待调度

3. 在 requestIdleCallback 空闲的时候执行任务

4. 从根节点开始遍历 Fiber Node，并且构建 WorkInProgress Tree

5. 生成 effectList

6. 根据 effectList 更新 DOM

```js
{
  ...
  // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
  stateNode: any,

    // 单链表树结构
  return: Fiber | null,// 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  child: Fiber | null,// 指向自己的第一个子节点
  sibling: Fiber | null,  // 指向自己的兄弟结构，兄弟节点的return指向同一个父节点

  // 更新相关
  pendingProps: any,  // 新的变动带来的新的props
  memoizedProps: any,  // 上一次渲染完成之后的props
  updateQueue: UpdateQueue<any> | null,  // 该Fiber对应的组件产生的Update会存放在这个队列里面
  memoizedState: any, // 上一次渲染的时候的state

  // Scheduler 相关
  expirationTime: ExpirationTime,  // 代表任务在未来的哪个时间点应该被完成，不包括他的子树产生的任务
  // 快速确定子树中是否有不在等待的变化
  childExpirationTime: ExpirationTime,

 // 在Fiber树更新的过程中，每个Fiber都会有一个跟其对应的Fiber
  // 我们称他为`current <==> workInProgress`
  // 在渲染完成之后他们会交换位置
  alternate: Fiber | null,

  // Effect 相关的
  effectTag: SideEffectTag, // 用来记录Side Effect
  nextEffect: Fiber | null, // 单链表用来快速查找下一个side effect
  firstEffect: Fiber | null,  // 子树中第一个side effect
  lastEffect: Fiber | null, // 子树中最后一个side effect
  ....
};
```

调度阶段

协同阶段 （生命周期可能会被多次调用）

提交阶段

React 在 render 第一次渲染时，会通过 React.createElement 创建一颗 Element 树，可以称之为 Virtual DOM Tree，由于要记录上下文信息，加入了 Fiber，每一个 Element 会对应一个 Fiber Node，将 Fiber Node 链接起来的结构成为 Fiber Tree。它反映了用于渲染 UI 的应用程序的状态。这棵树通常被称为 current 树（当前树，记录当前页面的状态），在后续的更新过程中（setState），每次重新渲染都会重新创建 Element, 但是 Fiber 不会，Fiber 只会使用对应的 Element 中的数据来更新自己必要的属性。WorkInProgress Tree 反映了要刷新到屏幕的未来状态，构造完毕后得到的就是新的 Fiber Tree，并把 current 指针指向新的 Fiber Tree。创建 WorkInProgress Tree 的过程也是一个 Diff 的过程，Diff 完成之后会生成一个 Effect List，这个 Effect List 就是最终 Commit 阶段用来处理副作用的阶段

## react 源码

如何调度任务？

1. 当交互事件调用 setState 后，会触发批量更新，在整个交互事件回调执行完之前 state 都不会发生变更。

2. 回调执行完毕后，开始更新任务，并触发调度。调度器会给这些更新任务一一设置优先级，并且在浏览器空闲的时候去执行他们，当然任务过期除外（会立刻触发更新，不再等待）。

3. 如果在执行更新任务的时候，有新的任务进来，会判断两个任务的优先级高低。假如新任务优先级高，那么打断旧的任务，重新开始，否则继续执行任务

diff 算法

1. 分层对比，同一层级才会 diff

2. 类型一致的节点才对比

3. key 值相同，尽可能重用

## 其它

### 原生事件和 React 合成事件

React 合成事件大多数绑定在 document 上, 优化了性能, 但是会有以下两个问题

1. 异步访问事件对象

```js
function onClick(e) {
  console.log(e);

  setTimeout(() => {
    // 输出undefined
    console.log(e);
  });
}

// --- 正确做法 ---
function onClick(e) {
  console.log(e);
  // 持久化事件对象
  e.persist();
  setTimeout(() => {
    console.log(e);
  });
}
```

2. 阻止原生事件冒泡

因为事件在 document 上处理, 所以 e.stopProgation 没有用, 正确的方法是用 e.nativeEvent.stopImmediatePropagation()

### 自定义 hook

可组合、可调式来判断函数是否是 hook

### 构建 React 组件步骤

1. 划分层级模块
2. 构建静态页面
3. 找到最小状态有哪些
4. 确定状态归属哪个模块
5. 添加交互

### others

在“严格模式”下开发时，React 会调用每个组件的函数两次，这有助于暴露由不纯函数引起的错误。

```ts
// ReactNode > ReactElement
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;

FC<IProps>;

ForwardRefRenderFunction<XxxRef, XxxProps>;

// style
CssProperties;

type PropsWithChildren<P> = P & { children?: ReactNode | undefined };

// html通用元素属性
HTMLAttributes<HTMLDivElement>;
// 也可以用interface 继承 ComponentProps
ComponentProps<'div'>;

// 鼠标事件对象
MouseEvent<HTMLDivElement>;
```
