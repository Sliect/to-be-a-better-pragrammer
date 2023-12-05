import { forEach, map, filter, toArray, toMap, exchange } from '../utils';

const treeNodes = [
  {
    id: 1,
    label: '1',
    children: [
      {
        id: 2,
        label: '2',
      },
    ],
  },
];

describe('useTree utils', () => {
  it('forEach', () => {
    const fn = jest.fn();
    forEach(treeNodes, fn);

    expect(fn).toBeCalledWith(treeNodes[0], { level: 0, index: 0, parent: undefined });
    expect(fn).toBeCalledWith(treeNodes[0].children[0], {
      level: 1,
      index: 0,
      parent: treeNodes[0],
    });
  });

  it('map', () => {
    const fn = jest.fn((node) => ({ ...node, title: node.label }));
    map(treeNodes, fn);

    expect(fn).toBeCalledWith({ id: 1, label: '1' }, { index: 0, level: 0, parent: undefined });
    expect(fn).toBeCalledWith(
      {
        id: 2,
        label: '2',
      },
      { index: 0, level: 1, parent: treeNodes[0] },
    );
    expect(fn.mock.results.map((it) => it.value)).toEqual([
      { id: 1, label: '1', title: '1' },
      { id: 2, label: '2', title: '2' },
    ]);
  });

  it('filter', () => {
    const fn = jest.fn((node) => node.id === 1);
    const result = filter(treeNodes, fn);

    expect(result).toEqual([{ id: 1, label: '1' }]);
  });

  it('filter 不存在 和 存在', () => {
    const treeNodes = [
      {
        id: 1,
        label: '余杭',
        children: [
          {
            id: 2,
            label: '良渚',
            children: [
              {
                id: 4,
                label: '新乡',
                children: null,
              },
            ],
          },
          {
            id: 3,
            label: '瓶窑',
            children: null,
          },
        ],
      },
    ];

    const fn = jest.fn((node) => node.label.includes('工会'));
    const fn2 = jest.fn((node) => node.label.includes('瓶窑'));
    const fn3 = jest.fn((node) => node.label.includes('新乡'));

    const result = filter(treeNodes, fn);
    const result2 = filter(treeNodes, fn2);
    const result3 = filter(treeNodes, fn3);

    expect(result).toEqual([]);
    expect(result2).toEqual([
      {
        id: 1,
        label: '余杭',
        children: [
          {
            id: 3,
            label: '瓶窑',
            children: null,
          },
        ],
      },
    ]);
    expect(result3).toEqual([
      {
        id: 1,
        label: '余杭',
        children: [
          {
            id: 2,
            label: '良渚',
            children: [
              {
                id: 4,
                label: '新乡',
                children: null,
              },
            ],
          },
        ],
      },
    ]);
  });

  it('toArray', () => {
    const result = toArray(treeNodes, { uniqueKey: 'id' });

    expect(result).toEqual([
      {
        id: 1,
        label: '1',
        level: 1,
        children: [
          {
            id: 2,
            label: '2',
            level: 2,
            parentKey: 1,
          },
        ],
      },
      {
        id: 2,
        label: '2',
        level: 2,
        parentKey: 1,
      },
    ]);
  });

  it('toMap', () => {
    const result = toMap(treeNodes, { uniqueKey: 'id' });

    expect(result).toEqual({
      1: {
        id: 1,
        label: '1',
        level: 1,
        children: [
          {
            id: 2,
            label: '2',
            level: 2,
            parentKey: 1,
          },
        ],
      },
      2: {
        id: 2,
        label: '2',
        level: 2,
        parentKey: 1,
      },
    });
  });

  it('exchange', () => {
    const result = exchange(
      [
        {
          id: 1,
          label: '1',
          children: [
            {
              id: 2,
              label: '2',
            },
            {
              id: 3,
              label: '3',
            },
          ],
        },
      ],
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        uniqueKey: 'id',
      },
    );

    expect(result).toEqual([
      {
        id: 1,
        label: '1',
        children: [
          {
            id: 3,
            label: '3',
          },
          {
            id: 2,
            label: '2',
          },
        ],
      },
    ]);
  });
});
