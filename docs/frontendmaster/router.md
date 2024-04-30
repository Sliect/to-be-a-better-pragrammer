# router

## history api

length history条数 
forward 前进 
back 后退 
go 前进或后退n个 
pushState 添加一个history
replaceState 替换当前history
scrollRestoration 保存scroll位置, 默认为auto, manual要自己设置 scroll 位置

``` js
// forward back go 会触发这个监听事件
// pushState replaceSate 不会触发这个监听事件
window.addEventListener('popstate', e => console.log(e))
```

![[react-router]]
