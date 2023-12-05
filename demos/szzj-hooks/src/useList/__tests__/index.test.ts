import { renderHook, act } from '@testing-library/react-hooks';
import useList from '../';

describe('useList', () => {
  it('add & remove item', () => {
    const { result } = renderHook(() => useList());

    act(() => {
      result.current.add(1);
    });

    expect(result.current.list).toEqual([1]);

    act(() => {
      result.current.remove(0);
    });

    expect(result.current.list).toEqual([]);
  });

  it('exchange item', () => {
    const { result } = renderHook(() =>
      useList({
        defaultList: [0, 1, 2, 3],
      }),
    );

    act(() => {
      result.current.exchange(0, 2);
    });

    expect(result.current.list).toEqual([2, 1, 0, 3]);
  });

  it('move down item', () => {
    const { result } = renderHook(() =>
      useList({
        defaultList: [0, 1, 2, 3],
      }),
    );

    act(() => {
      result.current.move(0, 2);
    });

    expect(result.current.list).toEqual([1, 2, 0, 3]);
  });

  it('move up item', () => {
    const { result } = renderHook(() =>
      useList({
        defaultList: [0, 1, 2, 3],
      }),
    );

    act(() => {
      result.current.move(2, 0);
    });

    expect(result.current.list).toEqual([2, 0, 1, 3]);
  });

  it('set list', () => {
    const { result } = renderHook(() =>
      useList({
        defaultList: [0, 1, 2, 3],
      }),
    );

    act(() => {
      result.current.setList([2, 0]);
    });

    expect(result.current.list).toEqual([2, 0]);
  });
});
