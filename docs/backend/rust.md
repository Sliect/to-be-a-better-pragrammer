# rust

获取 rust 文档
> rustup doc --std 

安装这个包后可以用命令式添加crate
> cargo install cargo-edit

删除依赖
> cargo rm xxx

## 所有权

1. Rust中每个值都被一个变量所拥有
2. 当所有者（变量）离开作用域范围时，这个值被丢弃

长度确定的基本类型存储在栈上，长度不定或可扩展的类型存储在堆上

## 字符串

中文占三个字节

字符串索引是按照字节计算

格式占位符
``` 
{}：默认格式化输出，用于打印各种类型的值。
{:#?}：以更美观的形式打印调试输出，通常用于打印结构体、枚举等复杂类型的值。
{:?}：以调试格式打印值，用于打印调试信息，可用于打印任何类型的值。
{:.x}：浮点数占位符，其中 x 代表小数点后的位数，用于控制浮点数的显示精度。
{:<x}：左对齐格式化输出，其中 x 代表最小宽度。
{:>x}：右对齐格式化输出，其中 x 代表最小宽度。
{:^x}：居中对齐格式化输出，其中 x 代表最小宽度。
```

## 生命周期

1. 每一个引用参数都会获得独自的生命周期

例如一个引用参数的函数就有一个生命周期标注: fn foo<'a>(x: &'a i32)，两个引用参数的有两个生命周期标注:fn foo<'a, 'b>(x: &'a i32, y: &'b i32), 依此类推。

2. 若只有一个输入生命周期(函数参数中只有一个引用类型)，那么该生命周期会被赋给所有的输出生命周期，也就是所有返回值的生命周期都等于该输入生命周期

例如函数 fn foo(x: &i32) -> &i32，x 参数的生命周期会被自动赋给返回值 &i32，因此该函数等同于 fn foo<'a>(x: &'a i32) -> &'a i32

3. 若存在多个输入生命周期，且其中一个是 &self 或 &mut self，则 &self 的生命周期被赋给所有的输出生命周期

拥有 &self 形式的参数，说明该函数是一个 方法，该规则让方法的使用便利度大幅提升。


'static 静态生命周期，活得和程序一样久
