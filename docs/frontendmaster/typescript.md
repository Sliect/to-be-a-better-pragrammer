# typescript

.d.ts 为声明文件，方便第三方文件引入

ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等

DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等

keyof 获取key的类型
``` ts
type OptionFlags<T> = {
  [Property in keyof T]: boolean
} 
type FeatureFlags = {
  mode: () => void;
  size: number;
}
type NewType = OptionFlags<FeatureFlags>
// type NewType = {
//   mode: boolean;
//   size: boolean;
// }

type Getter<T> = {
  [Property in keyof T as `get${Property}`]: () => T[Property]
}
type NewType2 = Getter<FeatureFlags>
// type NewType2 = {
//   getmode: () => () => void;
//   getsize: () => number;
// }
```

typeof 获取复杂的类型如下
``` ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

``` ts
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
//   ^ = type ShoutyGreeting = "HELLO, WORLD"

type Greeting = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
//   ^ = type QuietGreeting = "hello, world"

type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
//   ^ = type Greeting = "Hello, world"

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
//   ^ = type UncomfortableGreeting = "hELLO WORLD"
```

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

::: ts
React.HTMLAttributes HTML标签

React.FC 函数组件

React.ReactElement 组件实例

RefObject&lt;Element&gt; ref
:::

## 泛型工具类
``` ts
// 将T所有取得的属性变为可选
Partial<T>

// 将T所有取得的属性变为必选
Required<T>

// 将T所有取得的属性变为只读
Readonly<T>

// 组合将K中所有的属性的值转为T类型
Record<K, T>

// 在K中挑出一组T子属性来构造新类型
Pick<K, T>

// 在K中剔除一组T子属性来构造新类型
Omit<K, T>

// 在K中移除T来构造新类型
Exclude<K, T>

// 移除T中的null和undefined
NonNullable<T>

// T为函数，用T中的参数列表返来构造新类型
Parameters<T>

// T为函数，用T中的返回值来构造新类型
ReturnType<T>
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


表示 B 是 A 的子类型，即类型为 B 的变量可以赋值给类型为 A 的变量  
A -> B      
B extends A
子小父大

此为协变（顺变），逆变是 子类型推导到超类型，只有函数的参数位置是逆变  
A | B -> A or B -> A & B  

## infer

infer 必须在 extends 右侧使用，因为必须保证这个已知类型是由右侧的泛型推导出来的

P的类型推导有以下四种情况： 
1. P只在一个位置占位：直接推导出类型
2. P都在协变位置占位：推出占位类型的联合
3. P都在逆变位置占位：推出占位类型的交叉
4. P既在协变位置又在逆变位置占位：只有占位类型相同才能使 extends 为 true

``` ts
type Foo<T> = T extends (a: infer U) => void ? U : any;
// 第1种情况
type T0 = Foo<(a: string) => void>; // string

type Bar<T> = T extends { a: infer U; b: infer U } ? U : never;
// 第2种情况 协变
type T1 = Bar<{ a: string, b: number }> // string | number

type Baz<T> = T extends (a: infer U, b: infer U) => void ? U : never;
// 第3种情况 逆变
type T2 = Baz<(a: string, b: number) => void>; // string & number 即 never

type Tar<T> = T extends (a: infer U, b: infer U) => infer U ? U : 'hello';
// 第4种情况
type T3 = Tar<(a: string, b: number) => number>;  // 'hello'
// 第4种情况
type T4 = Tar<(a: string, b: string) => string>; // string
```


infer 示例
``` ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<() => string>; // string
type T3 = Unpacked<Promise<string>>; // string
type T4 = Unpacked<Promise<string>[]>; // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>; // string

```

## 分布式条件类型

``` ts
type Condition<T> = T extends 1 | 2 | 3 ? T : never;
// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Res3 = Naked<number | boolean>;

// "N"
type Res4 = Wrapped<number | boolean>;
```

满足分布式条件类型的前提是
1. 是否作为泛型参数（看Res1和Res2的区别）
2. 泛型参数在条件类型是否被数组包裹了（看Res3和Res4的区别）

好处是更容易实现集合运算

## tips

``` ts
const obj = {
  a: 'A',
  b: 'B',
  c: 'C',
}
type for0 = 'a' | 'b' | 'c'
// P为迭代项，只能在循环中作为值使用
type item = { [P in for0]: P }

// string | number | symbol
type for1 = keyof any

// 声明结构类型
type interface1 = typeof obj

// P in keyof T as P 将迭代项P作为U的子类型
// as 后面可以任意填值做判断
type MyOmit<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P]
}

// 需要严格相等
// Equal<{a: 'a', b: 'b' }, { a: 'a' } & { b: 'b' }> 为 false
type StrictEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type ComputedEqual<X, Y> = X extends Y ? Y extends X ? true : false : false

// Equal<A, B> extends true ? TrueType : FalseType
// 如果该子属性是readonly 则保留
type GetReadonlyKeys<T> = keyof {
  [P in keyof T as Equal<Pick<T, P>, Readonly<Pick<T, P>>> extends true ? P : never]: T[P]
}

// 协变 A extends B 可以视为 A < B
// infer 在string中的占位可以视为正则匹配

// 等价
function dfs(str: string, res = []) {
  if (str === '')
    return res

  let reg = /([^&]*)&(.*)/g
  if (reg.test(str)) {
    let L = str.replace(reg, '$1')
    let R = str.replace(reg, '$2')
    dfs(R, OtherOp(L, res))
  }
  else {
    dfs('', OtherOp(str, res))
  }
  return res
}
// S extends '' ? Res : xxx 来控制输出
// 泛型上新增参数Res来保存结果
type Dfs<S extends string, Res extends string[] = []> =
  S extends '' ? Res :
    S extends `${infer L}&${infer R}` ?
      Dfs<R, OtherOp<L, Res>> :
      Dfs<'', OtherOp<S, Res>>

// [P in keyof Res | K] 利用 | 给对象添加键值对
type Merge<Res extends { [k: string]: any }, K extends string, V> = {
  [P in keyof Res | K]:
  P extends K ? // K
    P extends keyof Res ? // 更新
      Res[P] : // 即 K 已在Res上存在 仍用旧值
      V // 即 K 不在Res上存在
    : Res[P] // 即 P 不为 K
}

type IsNegative<T extends number> = `${T}` extends `-${infer U}` ? true : false

type IsAny<T> = unknow extends T ? [T] extends [1] ? true : false : false

// 将两个对象的属性重新遍历合并，用于 StrictEqual 比较
type mergeObject<T> = {
  [P in keyof T]: T[P]
}
type AppendToObject<T, U extends string, V> = mergeObject<T & {
  [P in U as U]: V
}>

type Key = keyof any // number | string | symbol
type NeedString<T extends string> = T
// & string 可以与string取交集，强制缩小类型
type t0 = NeedString<Key & string>

type NeverToStr<T> = [T] extends [never] ? '' : T
// `foo${never}` 仍然是 never类型
type t1 = NeverToStr<`foo${never}`>

// 1 | 2  T与unknow取交集 则为T
type t2 = 1 | 2 & unknow
// unknow T与unknow取并集 则为unknow
type t3 = 1 | 2 | unknow
```

模拟两个数组的增加和移除来计算加法和减法
``` ts
type Rang<T extends Number = 0, P extends any[] = []> =
  P['length'] extends T ?
    P : Rang<T, [any, ...P]>

type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Add<T extends number, U extends number> = Concat<Rang<T>, Rang<U>>['length']

type Shift<T extends any[]> = T extends [infer F, ...infer Rest] ? Rest : []

type Append<T extends any[], E = any> = [...T, E]

type IsEmpty<T extends any[]> = T['length'] extends 0 ? true : false
type NotEmpty<T extends any[]> = IsEmpty<T> extends true ? false : true
type And<T extends boolean, P extends boolean> = T extends false
  ? false
  : P extends false
    ? false
    : true

type LessEqList<T extends any[], U extends any[]> =
  And<NotEmpty<T>, NotEmpty<U>> extends true ?
    LessEqList<Shift<T>, Shift<U>> :
    IsEmpty<T>
type LessEq<T extends number, U extends number> = LessEqList<Rang<T>, Rang<U>>

type SubList<T extends any[], P extends any[], R extends any[] = []> =
  T['length'] extends P['length'] ?
    R['length'] : SubList<Shift<T>, P, Append<R>>

type Sub<T extends number, R extends number> = 
  LessEq<R, T> extends true ?
    SubList<Rang<T>, Rang<R>> :
    SubList<Rang<R>, Rang<T>
```

### Design Patterns with Ts

@types/xxx 安装没有typescript的库

