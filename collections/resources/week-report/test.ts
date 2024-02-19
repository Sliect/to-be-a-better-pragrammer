type IType = 'a' | 'b' | 'c'
type IType2 = 'a' | 'c'
type Diff1 = IType extends IType2 ? never : IType

type Diff2<T, U> = T extends U ? never : T
type T1 = Diff2<'a' | 'b' | 'c', 'a' | 'c'> // ？

type Diff3<T, U> = [T] extends [U] ? never : T
type T2 = Diff3<'a' | 'b' | 'c', 'a' | 'c'> 

type Baz<T> = T extends (a: infer U, b: infer U) => void ? U : never;
// 第3种情况 逆变
type T3 = Baz<(a: { [k: string]: string}, b: { [key: string]: string }) => void>; // string & number 即 never