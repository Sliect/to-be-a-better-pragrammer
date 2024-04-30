# zustand

zustand 是一个状态管理库，通过 set, get, api 处理 state，后续状态都是通过 useSyncExternalStore 由 React 控制的

set 默认是浅合并，如果需要替换可以加上第二个参数，如 set(updater, true)

## quick start

```tsx
// useCountStor
import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));

export default useCountStore;

// Counter
import useCountStore from '../hooks/useCountStore';

export default function Counter() {
  const count = useCountStore((state) => state.count);

  return <h2>当前值：{count}</h2>;
}

// Controls
import useCountStore from '../hooks/useCountStore';
import { Button } from 'antd';

export default function Controls() {
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  return (
    <div>
      <Button
        onClick={() => {
          increment(1);
        }}
      >
        +1
      </Button>
      <Button
        style={{ marginLeft: 20 }}
        onClick={() => decrement(1)}
      >
        -1
      </Button>
    </div>
  );
}

// App
import Controls from './components/Controls';
import Counter from './components/Counter';

export default function App() {
  return (
    <div>
      <Counter />
      <Controls />
    </div>
  );
}
```

## no store actions

```ts
// 好处
// 1. 更容易拆分代码
// 2. 调用的时候更方便

// useCounterStore
import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

const useCountStore = create<State>(() => ({
  count: 0,
}));

const { setState } = useCountStore;

export const increment: Actions['increment'] = (qty) =>
  setState((state) => ({
    count: state.count + qty,
  }));

export const decrement: Actions['decrement'] = (qty) =>
  setState((state) => ({
    count: state.count - qty,
  }));

export default useCountStore;
```

## 中间件

### immer middleware

```ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

type State = {
  todos: Record<string, Todo>;
};

type Actions = {
  toggleTodo: (todoId: string) => void;
};

// 注意create使用ts语法时，必须在create后加上 <State & Actions>() 
export const useTodoStore = create<State & Actions>()(
  immer((set) => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
        title: 'Learn Valtio',
        done: false,
      },
      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
        title: 'Learn Signals',
        done: false,
      },
    },
    toggleTodo: (todoId: string) =>
      set((state) => {
        state.todos[todoId].done = !state.todos[todoId].done;
      }),
  }))
);
```

### persisting store data middleware

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useBearStore = create<{
  bears: number;
  addABear: () => void;
}>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
```

## subscribe

``` ts
const useStore = create((set) => ({
  count: 0,
}));

useStore.subscribe((state) => {
  console.log('Count has changed:', state.count);
}, (state) => state.count);
```