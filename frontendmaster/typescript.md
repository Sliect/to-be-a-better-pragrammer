.d.ts 为声明文件，方便第三方文件引入

基础类型

1. any

2. boolean

3. number

4. string

5. void

6. never

7. Enum

8. Tuple

9. Array

函数重载 把每一种特定的函数声明写出来，最后实现一个能处理所有参数类型的函数

泛型就是另一个维度的变量声明，且其可以继承接口

interface可以声明合并, type不行; type 可以声明基本类型别名，联合类型，元组等类型, interface 不行

总结：优先考虑能不能用 interface 实现, 如果不能则换 type 实现

## React JSX

React.HTMLAttributes HTML标签

React.FC 函数组件

React.ReactElement 组件实例

RefObject<Element> ref

## 泛型工具类

``` ts
// 将T所有取得的属性变为可选
Partial<T> 

// 将K中所有的属性的值转为T类型
Record<K, T>

// 在T中挑出子属性作为新类型
Pick<K, T>

// 在T中剔除子属性后作为新类型
Exclude<K, T>
```

## 特殊符号

``` ts
// ?.
// val = a === null || a === undefined ? undefined : a.b
const val = a?.b

// ??
// foo = a !== null && a !== undefined ? a : 'default string'
const foo = a ?? 'default string'
```