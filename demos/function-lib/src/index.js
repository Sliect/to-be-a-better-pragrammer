// 高阶函数的范式，在此基础上更改函数的 执行前、执行中、执行后 三个阶段
function HOF0(fn) {
  return function(...args) {
    return fn.apply(this, args);
  }
}