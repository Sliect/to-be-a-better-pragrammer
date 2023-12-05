import { useState, useCallback, useReducer, useMemo, Dispatch } from 'react';
import produce, { Draft } from 'immer';

/**
 * 引用对象不被修改，引用对象每被修改则返回一个新的对象
 * @param initialValue
 */
export function useImmer(initialValue: any) {
  const [val, setVal] = useState(initialValue);
  return [
    val,
    useCallback((updater: any) => {
      if (typeof updater === 'function') {
        return setVal(produce(updater));
      }
      return setVal(updater);
    }, []),
  ];
}

type Reducer<S = any, A = any> = (draftState: Draft<S>, action: A) => void | S;
/**
 * reducer每改变一次值，返回一个新的对象
 * @param reducer
 * @param initialState
 * @param initialAction
 */
export function useImmerReducer<S = any, A = any>(
  reducer: Reducer<S, A>,
  initialState: S,
  initialAction?: (initial: any) => S,
): [S, Dispatch<A>];

export function useImmerReducer<S = any, A = any>(
  reducer: Reducer<S, A>,
  initialState: S,
  initialAction?: (initial: any) => S,
) {
  const cachedReducer = useMemo(() => produce(reducer), [reducer]);
  return useReducer(
    cachedReducer,
    initialState as any,
    // @ts-ignore
    initialAction,
  );
}
