/**
 * @param fns 
 * @returns 
 * compose([fn1, fn2, fn3, fn4])(...args)
 * fn1(fn2(fn3(fn4(...args))))
 */
function compose(fns) {
  if (fns.length === 0) return (v) => v;

  return fns.reduce((res, curr) => (...args) => res(curr(...args)));
}
