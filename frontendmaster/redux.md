# redux 

简单的事情复杂化

在共享状态和各种操作之间加一个代理，通过在代理里debugger可以快速定位操作来源

利用观察者模式对数据变化进行监听

``` js
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```


## react-redux

1. 结合context和redux 实现数据共享 （缺点：大量的重复逻辑）

2. 利用高阶组件抽离重复逻辑 connect就是将共享的state对象和dispatch转换成需要的props给组件，并返回  

``` js
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
```

3. 将stroe,context抽离到Provider组件上
