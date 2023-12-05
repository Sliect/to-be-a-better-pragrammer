import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '../';

describe('useFetch', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const request = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 2000);
    });

  it('fetch basic', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(() => {
        return request();
      }),
    );

    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual('success');
  });

  const requestDefaultData = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 2000);
    });

  it('use defaultData when fetch failed or return undefined/null', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(
        () => {
          return requestDefaultData();
        },
        {
          manual: true,
          defaultData: [],
        },
      ),
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
  });

  const requestOnUseData = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [],
        });
      }, 2000);
    });

  it('use response.data when fetch successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(
        () => {
          return requestOnUseData();
        },
        {
          manual: true,
          useData: true,
        },
      ),
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
  });

  const requestOnDataIsUndefined = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: undefined,
        });
      }, 2000);
    });

  it('use defaultData when response.data is false', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(
        () => {
          return requestOnDataIsUndefined();
        },
        {
          manual: true,
          useData: true,
          defaultData: [],
        },
      ),
    );

    act(() => {
      result.current.fetch();
    });
    expect(result.current.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.data).toEqual([]);
  });
});
