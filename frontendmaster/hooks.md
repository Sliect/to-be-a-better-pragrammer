useRef      通过useRef创建的对象，其值只有一份，而且在所有Renderer之间共享  
useReducer  将依赖隐藏，只暴露dispath方法  
useEffect   监听依赖变化后执行回调  
useCallback 缓存函数，将函数的参数依赖隐藏，只暴露方法名的依赖  
useMemo     缓存变量，优化渲染  
useContext  局部上下文  

``` jsx
// 获取最新的值，而不是渲染后闭包中的值
const useCurrentValue = (val) => {
  const [value, setValue] = useState(val)
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

// 确保 MyComponent 组件的默认引用相同
// ES6的默认赋值在每次渲染的时候引用都发生改变
MyComponent.defaultProps = {
  params: {
    x: 0,
    y: 0
  }
}
// 确保父组件传给子组件的引用不变
// bad 每次父组件更新的时候，传给子组件的 params 引用都会发生变化
function App() {
  const [count, setCount] = useState(0)
  const params = { x: 0 }
  return (
    <div>
      <Child params={params} />
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  )
}
// good 传给子组件的 params 引用不变
function App() {
  const [count, setCount] = useState(0)
  const params = useRef({ x: 0 })
  return (
    <div>
      <Child params={params} />
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  )
}
```
