import { renderHook, act } from '@testing-library/react-hooks';
import useTable from '../';

describe('useTable', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const request = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            list: [{ a: 1 }],
            total: 1,
            current: 1,
            pageSize: 1,
          },
        });
      }, 2000);
    });

  it('fetch basic', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable(
        () => {
          return request();
        },
        {
          enableSuccessLog: true,
          enableFailLog: true,
        },
      ),
    );

    expect(result.current.props.loading).toEqual(true);

    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.props.dataSource).toEqual([{ a: 1 }]);
  });
});
