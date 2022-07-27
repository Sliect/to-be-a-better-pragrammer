# typescript

.d.ts 为声明文件，方便第三方文件引入

ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等

DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等

keyof 获取key的类型
``` js
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
``` js
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

``` js
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


tips
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
```