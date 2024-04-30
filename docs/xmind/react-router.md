
# createRouter

## createBrowserHistory

对history封装，主要是 listen, push, replace, go 这四个方法
listen对popstate事件的监听
push对pushState封装, 并调用popstate监听回调
replace对replaceState封装, 并调用popstate监听回调
go就是原生的history.go
### createLocation

对location封装

## matchRoutes

扁平化路由后和 location 匹配

# RouterProvider > DataRoutes

## useRoutesImpl

### _renderMatches

将匹配的路由结果渲染出来

# navigate

## startNavigation

### renderMatches

### updateState

触发setState，重新渲染组件树