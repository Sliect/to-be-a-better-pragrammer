import { renderHook } from '@testing-library/react-hooks';
import useMount from '../';

describe('useMount', () => {
  it('useMount should work', () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    rerender();
    expect(fn).toBeCalledTimes(1);
    unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
