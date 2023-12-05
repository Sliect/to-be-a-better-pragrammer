import { renderHook } from '@testing-library/react-hooks';
import useNow from '../';

/**
 * @todo 定时器测试
 */
describe('useNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('useNow should work', () => {
    // const fn = jest.fn();
    const { result, unmount } = renderHook(() => useNow());
    // expect(result.current.now).toEqual(Date.now());
    unmount();
  });
});
