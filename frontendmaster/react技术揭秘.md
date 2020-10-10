# [react技术揭秘](https://react.iamkasong.com/)

## React 理念

React 是一个 UI library, 让页面的交互更加自然, UI = f(data)

reconciliation: The algorithm React uses to diff one tree with another to determine which parts need to be changed.  
scheduling: the process of determining when work should be performed.  

---
React15:  
Reconciler(协调器): 负责找出变化的组件  
1. 调用函数组件、或class组件的 render 方法，将返回的 JSX 转化为虚拟 DOM
2. 将虚拟DOM和上次更新时的虚拟DOM对比
3. 通过对比找出本次更新中变化的虚拟DOM
4. 通知 Renderer 将变化的虚拟DOM渲染到页面上  

Renderer(渲染器): 负责将变化的组件渲染到页面上  
渲染的宿主环境有如下  
1. ReactDOM —— 浏览器环境  
2. ReactNative —— 渲染APP原生组件
3. ReactTest —— 渲染出纯JS对象用于测试 
4. ReactArt —— 渲染到Canvas, SVG 

递归更新的缺点：  
JS可以操作DOM，js线程和GUI渲染线程是互斥的，所以js脚本和浏览器布局、绘制不能同时执行。浏览器的刷新频率为60Hz，即(1000ms / 60Hz) 16.6ms浏览器刷新一次。
> js 脚本执行 => 样式布局 => 样式绘制
当js执行时间超过16.6ms，这次刷新就没有时间执行样式布局和样式绘制，即交互卡顿
---
React16:  
Scheduler(调度器): 调度任务的优先级，高优任务优先进入Reconciler  
在浏览器空闲时触发回调  

Reconciler(协调器)：负责找出变化的组件
fiber reconciler 作为默认的 reconciler，用来构建整颗 fiber tree 后，通知 Renderer 渲染

Renderer(渲染器)：负责将变化的组件渲染到页面上  
Renderer根据 Reconciler 为虚拟DOM打的标记，同步执行 DOM 更新操作  

实现异步可中断更新  
js执行 => render => Idle callback => js执行 ... 

---

## 未来树（workInProgress Fiber）构造 —— render阶段

``` js
// main steps of the work loop
const a1 = {name: 'a1', child: null, sibling: null, return: null};
const b1 = {name: 'b1', child: null, sibling: null, return: null};
const b2 = {name: 'b2', child: null, sibling: null, return: null};
const b3 = {name: 'b3', child: null, sibling: null, return: null};
const c1 = {name: 'c1', child: null, sibling: null, return: null};
const c2 = {name: 'c2', child: null, sibling: null, return: null};
const d1 = {name: 'd1', child: null, sibling: null, return: null};
const d2 = {name: 'd2', child: null, sibling: null, return: null};

a1.child = b1;
b1.sibling = b2;
b2.sibling = b3;
b2.child = c1;
b3.child = c2;
c1.child = d1;
d1.sibling = d2;

b1.return = b2.return = b3.return = a1;
c1.return = b2;
d1.return = d2.return = c1;
c2.return = b3;
/**
 * a1
 * b1 -> b2 -> b3
 *       c1    c2
 *       d1->d2 
 * 
 * output:
 * work performed for a1
 * work performed for b1
 * work completed for b1
 * work performed for b2
 * work performed for c1
 * work performed for d1
 * work completed for d1
 * work performed for d2
 * work completed for d2
 * work completed for c1
 * work completed for b2
 * work performed for b3
 * work performed for c2
 * work completed for c2
 * work completed for b3
 * work completed for a1
 */
let nextUnitOfWork = a1
workLoop()

function workLoop() {
  while(nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
}
function performUnitOfWork(workInProgress) {
  let next = beginWork(workInProgress)
  if (next === null) {
    next = completeUnitOfWork(workInProgress)
  }
  return next
}
function beginWork(workInProgress) { // 分为 mount 和 update 两种情况
  log('work performed for ' + workInProgress.name)
  return workInProgress.child
}
// 执行当前任务单元 并返回下一个任务单元
function completeUnitOfWork(workInProgress) {
  while(true) {
    let siblingFiber = workInProgress.sibling
    let returnFiber = workInProgress.return 
    nextUnitOfWork = completeWork(workInProgress)

    if (siblingFiber !== null) { 
      return siblingFiber
    } else if (returnFiber !== null) {
      workInProgress = returnFiber
      continue
    } else { // 回到root
      return null
    }
  }
}
// 所有子节点遍历完
function completeWork(workInProgress) {
  log('work completed for ' + workInProgress.name)
  return null
}
function log(message) {
  let node = document.createElement('div')
  node.textContent = message
  document.body.appendChild(node)
}

```

## 浏览器渲染 —— commit 阶段

useEffect处理  
触发useLayoutEffect、useEffect的生命周期  

## diff 

单节点diff  
1. 先判断是否存在 DOM 节点  
2. 通过对比 key 和 type 判断是否可以复用 DOM 节点
3. 若key 和 type 相同则复用 DOM 节点  
   若key 相同 type 不同则将fiber 及其兄弟fiber 标记为删除  
   其他则删除当前fiber  

``` html
// 未设置 key 则默认都为 null
// key 相同, li和p的type 不同, 满足3.2
ul > li * 3
ul > p

// key, type 相同, 满足 3.1
<div>foo</div>
<div>bar</div>

// key 不同, 满足 3.3
<div key="xxx">ka song</div>
<p key="ooo">ka song</p>
```

多节点diff  

优先更新操作，第一轮遍历处理更新的节点，第二轮遍历处理不属于更新的节点  

第一轮遍历  
1. 遍历newChildren, 将 newChildren[i] 与 oldFiber 相比, 判断 DOM 节点是否可复用
2. 若可复用, i++, 继续比较 newChildren[i] 与 oldFiber.sibling
3. 若不可复用, 分两种情况：key不同导致不可复用, 跳出第一轮遍历; key相同type不同导致不可复用, 将 oldFiber 标记为 Deletion, 继续遍历
4. 若遍历完newChildren 或 oldFiber, 跳出第一轮遍历

第二轮遍历
1. 第一轮中第4种情况跳出的遍历分3种情况
    - 同时遍历完
    - oldFiber 遍历完, newChildren 还没遍历完, newChildren 剩下的标记为 Placement
    - oldFiber 没遍历完, newChildren 遍历完, oldFiber 剩下的标记为 Deletion
2. 第一轮中的第3种情况跳出遍历(改变位置)
    1. 将剩余的 oldFiber 保存为 map
    2. 将第一轮中对比跳出的 i 记为 lastPlacedIndex
    3. 根据 map 找到 newChildren[i] 在旧的列表中的位置, 记为 oldIndex
    4. 若 oldIndex < lastPlacedIndex, 标记该节点需要右移
    5. 若 oldIndex >= lastPlacedIndex, 则 lastPlacedIndex = oldIndex, 表示不需要移动且最右侧的下标改变

``` 
abcd(旧)
dcba(新)

dcba
oldIndex 3 > lastPlacedIndex 0  lastPlacedIndex = 3   d不动

cba
oldIndex 2 < lastPlacedIndex 3  c右移

ba
oldIndex 1 < lastPlacedIndex 3  b右移

a
oldIndex 0 < lastPlacedIndex 3  a右移
```

## 源码解析

> ### reactElement
> ```js
> $$typeof: Symbol(react.element)
> key: null
> props:
> 	children:
>     $$typeof: Symbol(react.element)
>     key: null
>     props: {}
>     ref: null
>     type: ƒ App()
>     _owner: null
>     _store: {validated: true}
>     _self: null
>     _source: {fileName: "/Users/renjiazheng/Jar/jar-github/read-source/read-source/src/index.js", lineNumber: 9, columnNumber: 5}
>     __proto__: Object
>     __proto__: Object
> ref: null
> type: Symbol(react.strict_mode)
> _owner: null
> _store: {validated: false}
> 
> 
> const Demo = (props) => {
> 	return (<div className="demo">demo, {props.data}</div>)
> }
> 
> const App = () => {
> 	return (
>     	<div className="app">
>       	<Demo data={'hi'} />
>       </div>
>     )
> }
> 
> // ==> jsx to react element
> var Demo = function Demo(props) {
>   // type: html tag/comp/内建组件
>   // props: props/config/ref/key 等
>   // children: 后面的参数都是 children
>   return React.createElement("div", {className: 'demo'}, "demo, ", props.data);
> };
> 
> var App = function App() {
>   return React.createElement("div", {className: 'app'}, React.createElement(Demo, {
>     data: 'hi'
> }));
>   
> // 所有的 jsx 都会被转成 createElement,最终导出的就只有一个 App 函数，进入 render
> ```
> 
> * 函数组件/类组件的 render 返回值就是 react element
> * type
>   
>   * String，表示原生 dom，称为 hostcomponent
>   * class，classscomponent 本身
>   * function，functioncomponent 本身
>   * symbol，如：
>     
>     * symbol(react.strict_mode)
>     * symbol(react.portal)
>     * symbol(react.profile)
>     * symbol(react.fragment)
>     * symbol(react.provider)
>     * symbol(react.context)
>     * symbol(react.forward_ref)
>     * symbol(react.suspense)
>     * symbol(react.memo)
>     * symbol(react.lazy)
>     * ...
> * $$typeof
>   
>   * ReactElememt 函数创建的 element 都是 symbol(react.element)
> * props
>   
>   * 接收的 props 和 children
> 
> ### FiberRoot
> ```js
> function FiberRootNode(containerInfo, tag, hydrate) {
>   this.tag = tag;
>   this.current = null; // fiber tree 的根节点
>   this.containerInfo = containerInfo; // root dom
>   this.hydrate = hydrate; // 是否要与以后的 dom 融合
>   
>   this.pendingChildren = null;
>   this.pingCache = null;
>   this.finishedExpirationTime = NoWork;
>   this.finishedWork = null;
>   this.timeoutHandle = noTimeout;
>   this.context = null;
>   this.pendingContext = null;
>   this.callbackNode = null;
>   this.callbackPriority = NoPriority;
>   this.firstPendingTime = NoWork;
>   this.firstSuspendedTime = NoWork;
>   this.lastSuspendedTime = NoWork;
>   this.nextKnownPendingLevel = NoWork;
>   this.lastPingedTime = NoWork;
>   this.lastExpiredTime = NoWork;
> 
>   this.interactionThreadID = tracing.unstable_getThreadID();
>   this.memoizedInteractions = new Set();
>   this.pendingInteractionMap = new Map();
> }
> ```
> 
> ### FiberNode
> ```js
> function FiberNode(tag, pendingProps, key, mode) {
>   this.tag = tag; // 不同的组件类型
>   this.key = key; // react element 的 key
>   this.elementType = null; // react element 的 type
>   this.type = null; // 异步组件resolved之后返回的内容，一般是`function`或者`class`
>   this.stateNode = null; // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
> 
>   this.return = null; // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
>   this.child = null; // 指向自己的第一个子节点
>   this.sibling = null; // 兄弟节点的return指向同一个父节点
>   
>   this.index = 0;
>   this.ref = null; // ref
>   
>   this.pendingProps = pendingProps; // 新的 props
>   this.memoizedProps = null; // 旧的 props
>   this.memoizedState = null; // 新旧 state
>   
>   this.updateQueue = null; // 该Fiber对应的组件产生的Update会存放在这个队列里面
>   
>   this.dependencies = null;
>   this.mode = mode; // Effects 表示这个子树是否默认是异步渲染的
> 
>   this.effectTag = NoEffect; // 用来记录Side Effect
>   this.nextEffect = null; // 用来快速查找下一个side effect
>   this.firstEffect = null; // 第一个side effect
>   this.lastEffect = null; // 最后一个side effect
>   
>   this.expirationTime = NoWork; // 过期时间
>   this.childExpirationTime = NoWork; // 快速确定子树中是否有不在等待的变化
>   this.alternate = null; // `current <==> workInProgress` 在渲染完成之后他们会交换位置，类似于备份，方便重用
> }
> ```
> 
> ### tag
> * fiber node 类型
> 
> ```js
> export const FunctionComponent = 0;
> export const ClassComponent = 1;
> export const IndeterminateComponent = 2; // Before we know whether it is function or class，未知类型
> export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
> export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
> export const HostComponent = 5; // html tag
> export const HostText = 6; // text
> export const Fragment = 7;
> export const Mode = 8;
> export const ContextConsumer = 9;
> export const ContextProvider = 10;
> export const ForwardRef = 11;
> export const Profiler = 12;
> export const SuspenseComponent = 13;
> export const MemoComponent = 14;
> export const SimpleMemoComponent = 15;
> export const LazyComponent = 16;
> export const IncompleteClassComponent = 17;
> ```
> 
> ### effectTags
> * 副作用类型，标记每个更新的类型，作相应的处理
> 
> ```js
> export const NoEffect = /*              */ 0b00000000000;
> export const PerformedWork = /*         */ 0b00000000001;
> 
> // You can change the rest (and add more).
> export const Placement = /*             */ 0b00000000010; // 插入/移到
> export const Update = /*                */ 0b00000000100; // props 更新
> export const PlacementAndUpdate = /*    */ 0b00000000110;
> export const Deletion = /*              */ 0b00000001000;
> export const ContentReset = /*          */ 0b00000010000;
> export const Callback = /*              */ 0b00000100000;
> export const DidCapture = /*            */ 0b00001000000;
> export const Ref = /*                   */ 0b00010000000;
> export const Snapshot = /*              */ 0b00100000000;
> 
> // Update & Callback & Ref & Snapshot
> export const LifecycleEffectMask = /*   */ 0b00110100100;
> 
> // Union of all host effects
> export const HostEffectMask = /*        */ 0b00111111111;
> 
> export const Incomplete = /*            */ 0b01000000000;
> export const ShouldCapture = /*         */ 0b10000000000;
> ```
> 
> ### update & updateQueue
> * 调用更新函数会生成 update 对象，update 对象会维护在对应组件的 fiber node 上
> 
> ```js
> // 通过链表来存储所有的 update
> export type Update<State> = {
>   // 更新的过期时间
>   expirationTime: ExpirationTime,
> 
>   // export const UpdateState = 0;
>   // export const ReplaceState = 1;
>   // export const ForceUpdate = 2;
>   // export const CaptureUpdate = 3;
>   // 指定更新的类型，值为以上几种
>   tag: 0 | 1 | 2 | 3,
>   // 更新内容，比如`setState`接收的第一个参数，函数或者一个 state 对象
>   payload: any,
>   // 对应的回调，`setState`，`render`都有
>   callback: (() => mixed) | null,
> 
>   // 指向下一个更新
>   next: Update<State> | null,
>   // 指向下一个`side effect`
>   nextEffect: Update<State> | null,
> };
> 
> // 一个普通的对象
> export type UpdateQueue<State> = {
>   // 每次操作完更新之后的`state`，当更新阶段，basestate 存的是 state
>   baseState: State,
> 
>   // 队列中的第一个`Update`
>   firstUpdate: Update<State> | null,
>   // 队列中的最后一个`Update`
>   lastUpdate: Update<State> | null,
> 
>   // 第一个捕获类型的`Update`
>   firstCapturedUpdate: Update<State> | null,
>   // 最后一个捕获类型的`Update`
>   lastCapturedUpdate: Update<State> | null,
> 
>   // 第一个`side effect`
>   firstEffect: Update<State> | null,
>   // 最后一个`side effect`
>   lastEffect: Update<State> | null,
> 
>   // 第一个和最后一个捕获产生的`side effect`
>   firstCapturedEffect: Update<State> | null,
>   lastCapturedEffect: Update<State> | null,
> };
> ```
> 
> ### 渲染阶段
> * render(element, container, callback)
>   
>   * return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
>     
>     * root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
>       
>       * 创建 fiber root，如果不是 hydrate 模式，移除 dom root 内的节点
>       * new FiberRootNode，创建 fiber root 实例
>       * 同时参加 hostFiber，createFiber(HostRoot, null, null, mode)，即 fiber tree 的根节点
>       * 将 hostFiber 赋给 root.current，hostFiber.stateNode = root，stateNode 对应着 fiber root
>     * 封装 render 传入的 callback
>     * updateContainer(children, fiberRoot, parentComponent, callback)
>       
>       * scheduleWork(current$1, expirationTime) ，即执行 scheduleUpdateOnFiber 函数
>         
>         * performSyncWorkOnRoot(root)，同步的任务处理，还有 performConcurrentWorkOnRoot 模式的
>           
>           * workLoopSync()，执行该函数直到完成，执行不同组件的初始化，生成 fiber node
>             
>             * workInProgress = performUnitOfWork(workInProgress)，循环执行该函数，直到 workInProgress === null 退出循环
>               
>               * next = beginWork(current, unitOfWork, renderExpirationTime​$1)
>                 
>                 * 根据 fiber.tag 的类型来处理不同情况：
>                 * IndeterminateComponent，不确定什么类型，mountIndeterminateComponent
>                   
>                   * 当作 class component 或者 func component 处理
>                 * LazyComponent，mountLazyComponent
>                   
>                   * refineResolvedLazyComponent，检查组件是否 resolve
>                   * 当组件没有 resolve，会被抛出 throw
>                   * 当组件 resolve 之后，按照组件的 tag，进行相应的处理
>                 * FunctionComponent，updateFunctionComponent
>                   
>                   * renderWithHooks(current, workInProgress, Component, nextProps, context, renderExpirationTime)* 注入 ReactCurrentDispatcher，给 hook 提供通信
>                   * var children = Component(props, secondArg)，执行函数组件得到 react element* `函数组件执行`，这里可能多次执行
>                   
>                   
>                   
>                   
>                   * reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)，调和子组件
>                 * ClassComponent，updateClassComponent
>                   
>                   * constructClassInstance(workInProgress, Component, nextProps)* var instance = new ctor(props, context)，`组件实例化`
>                   
>                   
>                   * mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime)* applyDerivedStateFromProps，执行 `getDerivedStateFromProps`
>                   * callComponentWillMount，执行 `componentWillMount`
>                   
>                   
>                   * finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime)* reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)，调和子组件, 即 vdom diff 算法的过程，最后在 fiber tree 上，生成子的 fiber node* 根据 element 的 $$ typeof，string/number，array，interator 进行相应的处理* reconcileSingleElement* 如果是首次渲染，直接创建 fiber node，createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key)
>                   * 如果是更新阶段* 如果 $$typeof 是 react.element* fragment：返回 children 的 fiber node，并删除兄弟节点
>                   
>                   
>                   
>                   
>                   
>                   
>                   * reconcileSingleTextNode* createFiberFromText
>                   
>                   
>                   * reconcileChildrenArray
>                   * reconcileChildrenIterator
>                 * HostRoot，updateHostRoot
>                 * HostComponent，dom 类型，如 div 等，updateHostComponent
>                 * HostText，updateHostText
>                 * SuspenseComponent，updateSuspenseComponent
>                 * HostPortal，updatePortalComponent
>                 * ForwardRef，updateForwardRef
>                 * Fragment，updateFragment
>                 * Mode，updateMode
>                 * Profiler，updateProfiler
>                 * ContextProvider，updateContextProvider
>                 * ContextConsumer，updateContextConsumer
>                 * MemoComponent，updateMemoComponent
>                 * SimpleMemoComponent，updateSimpleMemoComponent
>                 * IncompleteClassComponent，mountIncompleteClassComponent
>                 * SuspenseListComponent，updateSuspenseListComponent
>               * next = completeUnitOfWork(unitOfWork)，当 next === null 即叶子结点时，执行 completeUnitOfWork
>                 
>                 * next = completeWork(current, workInProgress, renderExpirationTime$1)
>                   
>                   * HostComponent，updateHostComponent* prepareUpdate* diffProperties(domElement, type, oldProps, newProps, rootContainerInstance)* 样式属性，dom 属性
>                   * `事件绑定`，ensureListeningTo(rootContainerElement, propKey)* legacyListenToEvent(registrationName, doc)，事件都是绑定到 doc 上的。相关事件也会绑定，比如只绑定了 input onchange，其他*["blur", "change", "click", "focus", "input", "keydown", "keyup", "selectionchange"]  也一起进行绑定*
>                   * legacyListenToTopLevelEvent
>                   * trapCapturedEvent/trapBubbledEvent
>                   * trapEventForPluginEventSystem* 分为4种事件监听回调
>                   * DiscreteEvent，dispatchDiscreteEvent
>                   * UserBlockingEvent，dispatchUserBlockingUpdate
>                   * ContinuousEvent，dispatchEvent
>                   * 其他，dispatchEvent
>                   
>                   
>                   * addEventCaptureListener(container, rawEventName, listener)
>                   * addEventBubbleListener(container, rawEventName, listener)
>                   
>                   
>                   
>                   
>                   
>                   
>                   * createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress)* var domElement = createElement(type, props, rootContainerInstance, parentNamespace)
>                   * precacheFiberNode(internalInstanceHandle, domElement)
>                   * updateFiberProps(domElement, props)，事件回调处理* node[internalEventHandlersKey] = props，事件回调对象会挂到 dom node 上，如：_input {onFocus: ƒ, onChange: ƒ}_
>                   
>                   
>                   
>                   
>                   * appendAllChildren(instance, workInProgress, false, false)
>                   
>                   
>                   * HostText，updateHostText
>           * finishSyncRender，对 fiber node 生成 dom 片段，插入 dom
>             
>             * commitRoot，commitRootImpl，
>             * commitBeforeMutationEffects
>               
>               * commitBeforeMutationLifeCycles
>               * flushPassiveEffects
>                 
>                 * commitPassiveHookEffects
>                   
>                   * commitHookEffectListUnmount，执行 hook 的 clean。hook 存在 fiber node 的 lasteffect/firsteffect 上
>                   * commitHookEffectListMount，执行 hook 的 create
>                 * flushSyncCallbackQueue
>             * commitMutationEffects
>               
>               * commitResetTextContent，清空 innertext
>               * commitDetachRef，设置 ref current 为 null
>               * commitPlacement，插入到父节点
>                 
>                 * insertOrAppendPlacementNodeIntoContainer
>                 * insertOrAppendPlacementNode
>               * commitWork
>                 
>                 * FunctionComponent，ForwardRef，SimpleMemoComponent
>                   
>                   * commitHookEffectListUnmount，限制性 effect cleanup
>                 * commitUpdate
>                   
>                   * updateFiberProps，更新事件回调
>                   * updateProperties* updateDOMProperties，更新 dom 属性，不同的表单类型处理不一样
>                 * commitTextUpdate
>                 * commitSuspenseComponent
>                   
>                   * hideOrUnhideAllChildren，通过 css display none 来显示隐藏节点
>               * commitDeletion
>                 
>                 * unmountHostComponents
>                   
>                   * commitNestedUnmounts* commitUnmount
>                   
>                   
>                   * removeChildFromContainer
>                   * removeChild
>                   * commitUnmount* onCommitUnmount
>                   * safelyCallDestroy，hook destory 清除副作用
>                   * safelyDetachRef，重置 ref
>                   * safelyCallComponentWillUnmount，执行 unmount 函数
>                 * detachFiber，重置 fiber node 的 alternate 属性
>             * commitLayoutEffects，执行生命周期函数
>               
>               * `commitLifeCycles`
>                 
>                 * func comp，commitHookEffectListMount
>                   
>                   * 执行 useEffect 的 create 函数，同时得到 destory
>                   * effect.destory = create()
>                 * class comp
>                   
>                   * instance.componentDidMount()，执行 didmount
>                   * instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate)， 执行 didupdate
>                   * commitUpdateQueue(finishedWork, updateQueue, instance)
>                 * hostcomponent
>                   
>                   * commitMount(_instance2, type, props)，dom focus
>                 * HostRoot
>                   
>                   * commitUpdateQueue
>                 * SuspenseComponent
>                   
>                   * commitSuspenseHydrationCallbacks
>               * commitAttachRef
>                 
>                 * 给 fiber.ref 赋值 fiber.stateNode, stateNode 就是 dom 实例
>             * flushSyncCallbackQueue，执行 render 传入的 callback
> * 总结
>   
>   * beginWork 阶段
>     
>     * 组件实例化，执行部分生命周期函数
>     * reconcileChildren 调和子组件，生成子组件的 fiber node，子组件实例化，执行自身生命周期函数
>     * completeUnitOfWork 对 html tag/text 节点进行 dom 创建，属性挂载/事件绑定
>   * finishSyncRender 阶段
>     
>     * dom 片段生成，执行剩余生命周期函数
> 
> ### 更新阶段
> * setstate
>   
>   * var fiber = get(inst)，根据 instance 找到对应的 fiber node
>   * enqueueSetState，创建一个 update，将 update 存到链表中的 sharedQueue.pending
>   * scheduleWork，即 scheduleUpdateOnFiber，进入循环更新
>   * ```js
>     // 为更新创建对应的 update 对象
>     callback: null
>     expirationTime: 1073741823 // 过期时间
>     next: // 通过链表链接其他的 update
>       callback: null
>       expirationTime: 1073741823
>       next: {expirationTime: 1073741823, suspenseConfig: null, tag: 0, payload: {…}, callback: null, …}
>       payload: {count: 3} // setstate({count: 3})
>       priority: 98
>       suspenseConfig: null
>       tag: 0
>       __proto__: Object
>     payload: {count: 3} // setstate 的 state
>     priority: 98 // 优先级
>     suspenseConfig: null
>     tag: 0
>     
>     
>     // fiber 上的 updatequeue 对象
>     updateQueue:
>       baseState: {count: 1} // 最初的 state，更新后的 state 会更新这里
>       effects: null
>       baseQueue: { // 已处理的 update 链
>         callback: null
>         expirationTime: 1073741823
>         next: {…}
>         payload: {count: 2}
>         priority: 97
>         suspenseConfig: null
>         tag: 0
>       }
>       shared: {
>         pending: { // shared.pending,等待处理的 update
>           callback: null
>           expirationTime: 1073741823
>           next: {
>             callback: null
>             expirationTime: 1073741823
>             next: {expirationTime: 1073741823, suspenseConfig: null, tag: 0, payload: {…}, callback: null, …}
>             payload: {count: 3} // 第一个 setstate
>             priority: 98
>             suspenseConfig: null
>             tag: 0
>           }
>           payload: {count: 4} // 并列的第二个 setstate，会批量更新
>           priority: 98
>           suspenseConfig: null
>           tag: 0
>         }
>       }
>      
>     ```
>     
>     
>     
>     * 只有一个节点时，update 对象的 next 执行自身。循环链表
>     * payload，setstate 传入的对象
>     * 当连续 setstate 时
>       
>       * 正常情况：
>         
>         * 每个 setstate 会创建一个 update 存到 shared.pending 对象上，然后通过循环链表 next 来连起所有的 update，等到事件回调执行完才去进行调度更新，达到批量更新的效果
>       * 事件循环情况：
>         
>         * 当 setState 被推到事件循环中时，由于事件循环的机制，所有的任务都是分开执行的，所以每个 setstate 会执行一次调度更新
>         * ```js
>           const handle = () => {
>             // 两个 setTimeout 的任务是在事件循坏中分开执行的，当事件 handle 执行完后，不会有调度更新，当一个 settimeout task 执行时，会进行一次更新
>             setTimeout(() => {
>               // 里面的 setstate 也是逐个更新的，不是批量的，为什么？因为 excutionContext 是 nocontext。默认情况下就是每个更新动作都会触发一次调度更新。react 针对合成事件/生命函数进行了优化，阻止了调度更新。把调度更新移到了合成事件/生命函数执行完之后。使得一次合成事件执行，里面即使有多个更新动作，也只在最后才触发一次调度更新。
>               this.setState({ 
>                 count: 0
>               })
>               this.setState({
>                 count: 1
>               })
>             }, 0)
>             
>             setTimeout(() => {
>               this.setState({
>                 count: 0
>               })
>             }, 0)
>           }
>           ```
> * forceupdate
>   
>   * var fiber = get(inst)，根据 instance 找到对应的 fiber
>   * enqueueForceUpdate，创建 update，挂在 updateQueue 在当前的 fiber
>   * update.tag = ForceUpdate
>   * scheduleWork
> * replaceState
>   
>   * 跟 setState、forceUpdate 一样的逻辑
>   * update.tag = ReplaceState
>   * scheduleWork
> * useState
>   
>   * dispatchAction
>     
>     * scheduleWork
> * 总结
>   
>   * 触发更新动作，创建 update 存到对应的 fiber.updateQueue.shared.pending.payload 上，当多个更新触发时，会通过 next 指针形成链表。
>   * 每个 update 都是由更新动作触发而创建的。forceupdate/replacestate/setstate/usestate 的调用都会转化为一个个 update 对象，最后形成 update 链表
>   * 多个 setState 触发会如何？
>     
>     * 多个 setstate 在一个事件回调里面，需要等到事件回调执行完成。setstate 触发 scheduleWork 但不会进行 performSyncWorkOnRoot。而是等到事件回调执行完成。
>     * 执行 ensureRootIsScheduled 来将一个个 performSyncWorkOnRoot 存进一个数组里。
>     * 等事件回调执行完，会通过 flushSyncCallbackQueueImpl 方法将数组里的 performSyncWorkOnRoot 取出执行。这样就进入更新调度了
> 
> ### 事件系统
> * 事件是如何绑定的？
>   
>   * p 标签上有 onclick 事件，p 标签的父是 div
>     
>     * 在 div 对应的 fiber 调和子节点的时候生成 p 的 fiber，p 的事件还存在 p fiber.pendingProps 上。beginwork 完成后会将 fiber.pendingProps 上的属性存到 fiber.memoizedProps 上。即事件回调存到了 fiber.memoizedProps 上
>     * 在 completeWork 时，创建 fiber.stateNode。然后在 updateFiberProps 函数中 fiber.memoizedProps 赋给 fiber.stateNode
>     * ```js
>       // 事件回调存在 fiber.stateNode 上，不管是函数组件还是类组件
>       fiber.stateNode: {
>         handleClick: f,
>         handleChange: f,
>       }
>       ```
>   * 渲染阶段，在 finalizeInitialChildren 函数里进行
>     
>     * setInitialProperties，对某些标签的事件进行绑定，如：load，error，reset，submit，toggle，invalid 等，对表单元素会做很多额外的封装
>     * setInitialDOMProperties，设置 dom style，innerhtml，innertext，通过 ensureListeningTo 进行事件绑定等。这里的事件绑定是代理到 dom root/document 的
>     * ensureListeningTo，除了绑定对应的事件，还有其他相同组的事件，
>       
>       * 如：绑定的是 onchange，但 react 同时还会绑定 ["blur", "change", "click", "focus", "input", "keydown", "keyup", "selectionchange"]
>       * react 会将事件回调进行封装。比如，onchange = () => {console.log('hi')}。这个事件回调是存在 fiber.stateNode 上的
>       * 在事件绑定的时候，通过 dispatchDiscreteEvent 返回事件回调。即事件回调是被 dispatchDiscreteEvent 封装了
>       * ```js
>         // null，click，1，body
>         listener = dispatchDiscreteEvent.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container)
>         
>         discreteUpdates(dispatchEvent, topLevelType, eventSystemFlags, container, nativeEvent)
>         
>         
>         dispatchEvent
>           var blockedOn = attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent); // 回去对应的 dom 实例，即 fiber.stateNode
>           queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent)
>         ```
>       * discreteUpdates
> * 事件是如何执行的？
>   
>   * 事件会代理在 dom root 上。当事件触发时，dom root 会监听到事件触发，然后执行事件回调
>   * 每个事件回调都会被 dispatchEvent 封装，通过 runWithPriority 进行调度执行
> 
> ![image-20200602230333548](https://camo.githubusercontent.com/4d6acc01097e26a5b50af6d1525d2ac3a617c15d/68747470733a2f2f747661312e73696e61696d672e636e2f6c617267652f30303753385a496c6779316769327a6b75386a72396a333078773075303131672e6a7067)
> 
> ### hook
> * hook 是如何存储的？
> 
> ```js
> const App = () => {
>   const [a, seta] = useState(11) // hook 1
>   const ref = useRef('ref') // hook 2
>   const [b, setb] = useState(22) // hook 3
>   useEffect(() => { // hook 4
>     console.log('effect')
>     return () => {
>       console.log('clean')
>     }
>   }, [])
>   
>   return (<div>app</div>)
> }
> 
> // 当前 fiber node
> ...
> elementType: ƒ App()
> memoizedState: {
>   baseQueue: null
>   baseState: 11
>   memoizedState: 11 // hook 1
>   next: {
>     baseQueue: null
>     baseState: null
>     memoizedState: {current: div.App} // hook 2
>     next: {
>       baseQueue: null
>       baseState: 22
>       memoizedState: 22 // hook 3
>       next: { // hook 4, effect hook 没有 memoizedState
>         create: () => {…}  // effect
>         deps: null
>         destroy: () => { console.log('clean'); } // effect cleanup
>         next: {tag: 5, deps: null, next: {…}, create: ƒ, destroy: ƒ}
>         tag: 5
>       }
>       queue: {
>       	dispatch: ƒ () // setb
>         lastRenderedReducer: ƒ basicStateReducer(state, action)
>         lastRenderedState: 22
>         pending: null
>       }
>     }
>     queue: null
>     }
>   }
>   queue: {
>     dispatch: ƒ () // seta
>     lastRenderedReducer: ƒ basicStateReducer(state, action)
>     lastRenderedState: 11
>     pending:
>   }
> }
> ```
> 
> * hook 是如何执行的？
>   
>   * useState
>     
>     * mountState(initialState)
>       
>       * 创建一个空的 hook 对象，计算 initialstate，因为有可能是函数，将 state 存到 hook.baseState 上，同时初始化 hook.queue, 绑定 hook.dispatcher
>       * ```js
>         hook: {
>           baseQueue: null
>           baseState: null
>           memoizedState: null
>           next: null
>           queue: null
>         }
>         hook.memoizedState = hook.baseState = initialState
>         hook.queue = {
>           pending: null,
>           dispatch: null,
>           lastRenderedReducer: basicStateReducer,
>           lastRenderedState: initialState
>         }
>         dispatch = hook.queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue)
>         
>         // [a, seta] = useState(1)
>         return [hook.memoizedState, dispatch]
>         ```
>     * dispatchAction
>       
>       * scheduleWork
>     
>     ```js
>     seta(33)
>     dispatchAction(fiber, queue, action)
>     
>     // 参数：
>     action: 33
>     queue: {
>       dispatch: ƒ ()
>       lastRenderedReducer: ƒ basicStateReducer(state, action)
>       lastRenderedState: 11
>       pending: {
>         action: 33
>         eagerReducer: ƒ basicStateReducer(state, action)
>         eagerState: 33
>         expirationTime: 1073741823
>         next: {expirationTime: 1073741823, suspenseConfig: null, action: 33, eagerState: 33, eagerReducer: ƒ, …}
>         priority: 98
>       }
>     }
>     
>     然后创建一个 update
>     接着开始调度更新：scheduleWork(fiber, expirationTime) // 所有更新最终都是结果 scheduleWork 来调度
>     ```
>   * useRef
>     
>     * mountRef(initialValue)
>       
>       * 创建一个空的 hook 对象，创建 ref 对象，将 ref 对象存到 hook 上
>       * ```
>         hook：{
>           baseQueue: null
>           baseState: null
>           memoizedState: null
>           next: null
>           queue: null
>         }
>         
>         ref: {
>           current: initialvalue
>         }
>         
>         hook.memoizedState = ref
>         ```
>   * useEffect
>     
>     * mountEffect(create, deps)
>       
>       * mountEffectImpl(Update | Passive, Passive$1, create, deps)
>       * 创建一个 hook，标记 effectTag = fiberEffectTag，将 effect 挂到 hook.memoizedState 上
>       * ```
>         hook: {
>           baseQueue: null
>           baseState: null
>           memoizedState: {tag: 5, destroy: undefined, deps: null, next: {…}, create: ƒ}
>           next: null
>           queue: null
>         }
>         ```
>   * useCallback
>     
>     * mountCallback(callback, deps)
>       
>       * hook.memoizedState = [callback, nextDeps]
>   * useContext
>     
>     * readContext(callback, deps)
>     * ```
>       // 首个 context
>       lastContextDependency = contextItem;
>       currentlyRenderingFiber.dependencies = { // 在 fiber dependencies 上存储 context 信息
>         expirationTime: NoWork,
>         firstContext: {
>           context: context,
>           observedBits: deps,
>           next: null
>         },
>         responders: null
>       };
>       
>       // 新增的 context
>       lastContextDependency = lastContextDependency.next = {
>           context: context,
>           observedBits: deps,
>           next: null
>         }
>       ```
>   * useLayoutEffect
>     
>     * mountLayoutEffect(create, deps)
>       
>       * mountEffectImpl
>       * ```
>         mountEffectImpl(Update | Passive, Passive$1, create, deps) // useEffect
>         mountEffectImpl(Update, Layout, create, deps) // useLayoutEffect
>         ```
>   * useReducer
>     
>     * mountReducer，和 usestate 的逻辑差不多
>   * 当组件多长执行时，只是重复创建 hook ，相当于 hook 的初始化，不会进行 hook 的执行。hook 还没有和 fiber 相关联
>   * 但 seta 的时候，会进行 dispatch 当前的 fiber 和当前的 hook.queue
> 
> ### context
> * context 存在哪里？也是 fiber.stateNode 上
> * todo
> 
> ### ref
> * todo
> 
> ```
> react element
> $$typeof: Symbol(react.element)
> key: null
> props: {className: "App", children: Array(3)}
> ref: {current: "hiref"}
> type: "div"
> _owner: FiberNode {tag: 2, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
> _store: {validated: false}
> ```
> 
> ### concurrent mode
> * todo
> 
> ### 整体的 fiber tree
> ```js
> class DemoCls extends React.Component {
>   state = {
>     count: 1
>   }
> 
> handle = () => {
>     this.setState({
>       count: 3
>     })
>   }
> 
>   render() {
>     return (
>       <div onClick={this.handle}>class, {this.state.count}</div>
>     )
>   }
> }
> 
> function App() {
>   const [a, seta] = useState(11)
>   const ref = useRef('hiref')
>   const [b, setb] = useState(22)
>   
>   useEffect(() => {
> 		console.log('effect')
>     return () => {
>       console.log('clean')
>     }
>   })
> 
>   const handle = () => {
>     console.log(ref)
>   }
> 
>   const handleChange = () => {
>     console.log('input')
>   }
> 
>   const handleFocus = () => {
>     console.log('focus')
>   }
> 
>   return (
>     <div>
>       <p 
>         onClick={handle} 
>         style={{color: '#fff'}} 
>         className="test" 
>         id="test" 
>         key="test"
>         ref={ref}
>       >
>         say <span>hi</span> haaa!
>       </p>
> 
>       <input 
>         id="inpuid" 
>         onFocus={handleFocus} 
>         onChange={handleChange} 
>       />
> 
>       <DemoCls />
>     </div>
>   );
> }
> 
> render(<App />, root)
> 
> 
> fiberRoot {
>   containerInfo: 指向 dom root 
>   current: 指向 root fiber，fiber tree 的根节点
> }
> 
> hostFiber { // fiber tree 的根节点
>   alternate: 自身
>   stateNode: 指向 fiberRoot
>   type: null
>   child: 指向 App 的 fiber
> }
> 
> App fiber {
>   alternate: 指向自身
>   stateNode: null
>   type: f App() // 组件
>   elemenType: f App() // 组件
>   return: 指向 host fiber
>   sibling：null
>   child：指向 div fiber
>   firstEffect: 需要更新的 fiber
>   lastEffect: 需要更新的 fiber
>   nextEffect: null
>   memoizedProps: {}
>   memoizedState: {
>     baseQueue: null
>     baseState: 11
>     memoizedState: 11
>     queue: {
>       dispatch: f // seta
>       lastRenderedReducer: f
>       lastRenderedState: 11
>       pending: null
>     }
>     next: {
>       baseQueue: null
>       baseState: null
>       memoizedState: {
>         current: f
>       }
>       queue: null
>       next: {
>         baseQueue: null
>         baseState: 22
>         memoizedState: 22
>         queue: {
>           dispatch: f // setb
>           lastRenderedReducer: f
>           lastRenderedState: 22
>           pending: null
>         }
>         next: {
>           baseQueue: null
>           baseState: null
>           memoizedState: {
>             create: f
>             deps: null
>             destroy: f
>             next: {}
>           }
>           queue: null
>         }
>       }
>     }
>   }
>   pendingProps: {}
>   ref: null
>   updateQueue: {
>     lastEffect: { // useEffect
>       create: () => {...}
>       deps: null
>       destroy: () => {...} // clean up
>       next: {...} // next useEffect
>     }
>   }
> }
> 
> div fiber {
>   alternate: 自身
> 	stateNode: dom div
> 	type: "div"
> 	elementType: "div"
> 	return: 指向 app fiber
> 	sibling：null
> 	child：指向 p fiber，第一个 child
> 	ref： null
> 	key： null
> 	firstEffect: 需要更新的 fiber
>   lastEffect: 需要更新的 fiber
>   nextEffect: null
>   memoizedProps: 指向 children 组件，react element，不是 fiber，3个 children。p、input、democl
>   memoizedState: null
>   prndingProps: 指向 children 组件，react element，不是 fiber，3个 children
> }
> 
> p fiber {
>   alternate: 自身
>   stateNode：dom p
>   type: "p"
>   elementType: "p"
>   return: 指向 div fiber
>   sibling：指向 input fiber
>   child：指向 say fiber
>   ref：{current: f}
>   key: "test"
>   fistEffect: null
>   lastEffect: null
>   nextEffect: null
>   memoizedProps: {
>     children: ["say", {...}, "haaa!"] // react element
>     className: "test"
>     id: "test"
>     onClick: f
>     style: {color: "#fff"}
>   },
>   memoizedState: null
>   pendingProps: {
>     children: ["say", {...}, "haaa!"] // react element
>     className: "test"
>     id: "test"
>     onClick: f
>     style: {color: "#fff"}
>   }
> }
> 
> say fiber {
>   alternate: null
>   stateNode：text say
>   type: null
>   elementType: null
>   return: 指向 p fiber
>   sibling：指向 span fiber
>   child：null
>   ref：null
>   key: null
>   fistEffect: null
>   lastEffect: null
>   nextEffect: null
> }
> 
> ...
> 
> Democls fiber {
>   alternate: 自身
>   stateNode: Democls fiber
>   type: class Democls
>   elementType: class Democls
>   return: 指向 div fiber
>   sibling: null
>   child: 指向 div fiber
>   memoizedState: {count: 1}
>   memoizedProps: {}
>   ...
>   updateQueue: {
>     baseQueue: {
>       callback: null
>       next: {...}
>       pauload: {count: 2} // 还没处理的 update
>     }
>     baseState: {count: 1} // 已完成的 update
>     effects: null
>     shared: {pending: null}
>   }
> }
> ```
> 
> * 递归流程
>   
>   * 从 hostFiber 开始，一直递归第一个子节点
>   * 直到子节点为空，返回上一个含兄弟节点的父节点，从兄弟节点开始递归第一个子节点
>   * 直到返回到 hostFiber
> * 渲染流程
>   
>   * 从入口 render 开始
>   * 先创建 fiberRoot，同时创建 hostFiber
>   * 然后进入 updateContainer  函数，在这里创建 update，同时通过 enqueueUpdate 函数把 render 入口的 react element 存到 hostfiber.updateQueue.shared.pending.payload
>     
>     * enqueueUpdate(fiber, update)，这个函数专门是将更新存在对应的 fiber 上的
>   * 设置完 update 就开始继续调度 scheduleWork(fiber, expTime)，计算优先级，根据过期时间和优先级，继续不同策略的调度
>     
>     * expirationTime === Sync，performSyncWorkOnRoot，同步渲染
>     * ensureRootIsScheduled，performConcurrentWorkOnRoot，异步渲染
>     * ？？？同步渲染/异步渲染有什么区别？？？
>   * 在 performSyncWorkOnRoot 循环执行 workLoopSync，直到完成，这时证棵 fiber tree 就构建完成了。然后执行 finishSyncRender(root) 进行渲染 dom
>   * workLoopSync 里根据 react element 循环创建对应的 fiber
>     
>     * beginWork(current, unitOfWork, expirationTime)
>       
>       * 根据 fiber.tag 执行不同的创建 fiber 方式
>       * 比如是 hostRoot，即 hostFiber，会拿到 fiber.updateQueue.shared.pending.payload 上的 react element，即 render 的入口组件。一般是 react element 或者 react 的内置组件。如 react.strict_mode。然后进入调和子组件，reconcileChildren
>       * 比如是函数组件，直接执行函数组件，执行过程中，会将 hook，props，state 等存到 fiber 上
>     * 当到达一个树分支的叶子节点，执行 completeUnitOfWork
>       
>       * 根据 fiber.tag 进行相应的 dom 生成，一般是 hostComponent(即 dom 节点，如 div)/hostText (文本)
>       * 渲染阶段
>         
>         * createInstance，创建相应的 dom 节点
>           
>           * updateFiberProps，存储事件回调
>         * appendAllChildren，插入到父节点中
>         * finalizeInitialChildren，初始化，dom 节点的属性，和事件绑定
>         * markRef，ref 绑定 dom 实例
>       * 更新阶段
>         
>         * updateHostComponen，进行属性更新，事件绑定
>   * 调和子组件是什么过程？reconcileChildren
>     
>     * 首次渲染，会直接创建对应的 fiber
>       
>       * createFiberFromFragment
>       * createFiberFromElement
>       * createFiberFromText
>       * createFiberFromTypeAndProps
>       * createFiber
>     * 更新阶段
>       
>       * reconcileSingleElement，只有一个节点
>         
>         * 如果不是 fragment，复用该节点的第一个子节点的 fiber，删除其兄弟节点，重置 ref
>         * 如果是 fragment，删除该节点的兄弟节点，返回字节点
>       * reconcileSingleTextNode
>         
>         * 删除该节点的兄弟节点，复用第一个子节点
>     * 数组节点，即两个新旧数组比较，key 的作用，fiber.index 记录着原数组的长度
>       
>       * 如果旧的 fiber 存在
>         
>         * 循环新的数组，通过 key 优化
>           
>           * 通过第一个 oldfiber 和第一个 element，得到一个新 fiber
>           * 如果数组里的节点是 string/number，执行 updateTextNode
>           * 如果是对象，updateElement/updateFragment
>           * 如果旧的节点为空，创建新的节点
>       * 如果新数组比就数组小，删除旧数组的其他节点
>       * 如果旧的 fiber 不存在
>         
>         * 如果旧的数组比新的数组小，直接创建新数组的其他节点的 fiber
>       * 通过 key 复用 fiber
>   * 循环执行完 workLoopSync 后，进行 finishSyncRender
>     
>     * commitBeforeMutationEffects，插入 dom 前，循环遍历 fiber tree 上的 nextEffect，执行一些生命周期函数
>       
>       * commitBeforeMutationLifeCycles
>         
>         * 执行 getSnapshotBeforeUpdate
>       * flushPassiveEffects
>         
>         * commitHookEffectListUnmount
>         * commitHookEffectListMount，执行 hook
>     * commitMutationEffects
>       
>       * commitUpdate
>         
>         * updateFiberProps
>         * updateProperties，updateDOMProperties，更新 dom 属性
>       * commitTextUpdate
>       * commitPlacement
>         
>         * insertOrAppendPlacementNode/insertOrAppendPlacementNodeIntoContainer
>         * 将 fiber.stateNode 插入到 dom root 上
>     * commitLayoutEffects
>       
>       * commitLifeCycles
>         
>         * commitHookEffectListMount，hook effect
>         * componentDidMount/componentDidUpdate
>         * commitUpdateQueue，执行 render 传入的 callback
>       * commitAttachRef，绑定 ref
> * 流程回顾
>   
>   * ```js
>     // 渲染阶段
>     scheduleUpdateOnFiber
>       performSyncWorkOnRoot
>         workLoopSync
>           performUnitOfWork
>             beginWork // 通过父 fiber 生成 child element 相应的 fiber，循环完，最终会生成整颗 fiber tree
>               /updateFunctionComponent // 函数组件执行，hook dispatcher 绑定
>               /updateClassComponent // 类组件执行，相关生命函数执行
>               /updateHostRoot
>               /updateHostComponent
>               /updateHostText
>                  reconcileChildren // child element to fiber
>           completeUnitOfWork
>             completeWork // 给每个 fiber 创建 dom 实例，同时存到对应 fiber.stateNode。循环将子的 dom 实例插入到父的 dom 实例中。然后初始化每个 fiber.statenode 的 dom 属性、事件等
>         finishSyncRender // 如果是组件，执行相关的生命函数、hook。将 hostfiber.stateNode 插入到 dom root。最后执行 callback
>     ```
>   * hastFiber，对 updateQueue.shared.pending.payload 上的 react element(即 app 组件) 生成对应的 fiber
>   * 然后通过 app fiber 去 reconcileChildren 调合 children element 的到 children fiber。最终完成整颗 fiber tree
>   * 在 completeWork 的时候将 instance 存到 fiber.stateNode
>   * fiber tree 创建后，会进行 finishSyncRender 生成每个 fiber 对应的 stateNode
> * 整体流程分为：
>   
>   * performUnitOfWork = beginWork + reconcilerChildren + completeUnitOfWork
>     
>     * beginWork: 组件实例化，生命函数
>       
>       * constructor
>       * getDeriveStateFromProps
>       * shouldComponentUpdate
>       * render
>     * reconcilerChildren：子 element 对应的 fiber 创建，diff 算法
>     * completeUnitOfWork：dom 实例化，属性设置/更新，事件注册，dom 插入形成片段
>     * performUnitOfWork 过程可以被**中断/恢复/重来**。因为这个阶段没有副作用。会出现生命函数执行多次
>   * finishSyncRender = commitRoot
>     
>     * dom 插入，属性更新，生命函数。这个阶段不能中断，含有副作用。
>       
>       * getSnapshotBeforeUpdate // 可以读到 dom
>       * componentDidMount
>       * componentDidUpdate
>   * about fiber：
>     
>     * [facebook/react#7942](https://github.com/facebook/react/issues/7942)
>     * [facebook/react#6170](https://github.com/facebook/react/issues/6170)
> 
