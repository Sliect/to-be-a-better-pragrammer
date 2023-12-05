import { renderHook, act } from '@testing-library/react-hooks';
import useTree from '../';

type TreeNode = {
  title: string;
  key: string;
  parentKey?: string;
  level?: number;
  children?: TreeNode[];
};

const initialNodes: TreeNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
      },
    ],
  },
];

describe('useTree', () => {
  it('attach parentKey and level', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    expect(result.current.treeNodes[0].level).toEqual(1);
    expect(result.current.treeNodes[0].parentKey).toEqual(undefined);
    expect(result.current.treeNodes[0].children?.[0]?.level).toEqual(2);
    expect(result.current.treeNodes[0].children?.[0]?.parentKey).toEqual('0-0');
  });

  it('insertAfter', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.insertAfter(
        {
          title: 'parent 1-2',
          key: '0-0-2',
        },
        '0-0-0',
      );
    });

    expect(result.current.treeNodes[0].children?.[1]).toEqual({
      title: 'parent 1-2',
      key: '0-0-2',
      level: 2,
      parentKey: '0-0',
    });
  });

  it('append', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.append(
        {
          title: 'parent 1-2',
          key: '0-0-2',
        },
        '0-0',
      );
    });

    expect(result.current.treeNodes[0].children?.[2]).toEqual({
      title: 'parent 1-2',
      key: '0-0-2',
      level: 2,
      parentKey: '0-0',
    });
  });

  it('prepend', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.prepend(
        {
          title: 'parent 1-2',
          key: '0-0-2',
        },
        '0-0',
      );
    });

    expect(result.current.treeNodes[0].children?.[0]).toEqual({
      title: 'parent 1-2',
      key: '0-0-2',
      level: 2,
      parentKey: '0-0',
    });

    expect(result.current.treeNodes[0].children?.length).toEqual(3);
  });

  it('remove', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.remove('0-0');
    });

    expect(result.current.treeNodes.length).toEqual(0);
  });

  it('exchange', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.exchange(result.current.findNode('0-0-0'), result.current.findNode('0-0-1'));
    });

    expect(result.current.treeNodes[0].children?.[0]).toEqual({
      title: 'parent 1-1',
      key: '0-0-1',
      level: 2,
      parentKey: '0-0',
    });
  });

  it('down', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.down(result.current.findNode('0-0-0'));
    });

    expect(result.current.treeNodes[0].children?.[0]).toEqual({
      title: 'parent 1-1',
      key: '0-0-1',
      level: 2,
      parentKey: '0-0',
    });
  });

  it('up', () => {
    const { result } = renderHook(() =>
      useTree(initialNodes, {
        uniqueKey: 'key',
      }),
    );

    act(() => {
      result.current.up(result.current.findNode('0-0-1'));
    });

    expect(result.current.treeNodes[0].children?.[0]).toEqual({
      title: 'parent 1-1',
      key: '0-0-1',
      level: 2,
      parentKey: '0-0',
    });
  });
});
