"use strict";
const Context = React.createContext(null);
class Dispatcher {
    constructor() {
        this.callbacks = {};
        this.data = {};
        this.update = (namespace) => {
            if (this.callbacks[namespace]) {
                this.callbacks[namespace].forEach((cb) => {
                    try {
                        const data = this.data[namespace];
                        cb(data);
                    }
                    catch (e) {
                        cb(undefined);
                    }
                });
            }
        };
    }
}
// 将hook中的值首次存储到订阅中心
function Executor(props) {
    const { hook, onUpdate, namespace } = props;
    const updateRef = useRef(onUpdate);
    const initialLoad = useRef(false);
    let data;
    try {
        data = hook();
    }
    catch (e) {
        console.error(`plugin-model: Invoking '${namespace || 'unknown'}' model failed:`, e);
    }
    // 首次执行时立刻返回初始值
    useMemo(() => {
        updateRef.current(data);
    }, []);
    // React 16.13 后 update 函数用 useEffect 包裹
    useEffect(() => {
        if (initialLoad.current) {
            updateRef.current(data);
        }
        else {
            initialLoad.current = true;
        }
    });
    return null;
}
const dispatcher = new Dispatcher();
function Provider(props) {
    return (<Context.Provider value={{ dispatcher }}>
      {Object.keys(props.models).map((namespace) => {
        return (<Executor key={namespace} hook={props.models[namespace]} namespace={namespace} onUpdate={(val) => {
            // 更新订阅中心的 hooks 返回值
            dispatcher.data[namespace] = val;
            dispatcher.update(namespace);
        }}/>);
    })}
      {props.children}
    </Context.Provider>);
}
function useModel(namespace, selector) {
    const { dispatcher } = useContext(Context);
    const selectorRef = useRef(selector);
    selectorRef.current = selector;
    const [state, setState] = useState(() => selectorRef.current
        ? selectorRef.current(dispatcher.data[namespace])
        : dispatcher.data[namespace]);
    const stateRef = useRef(state);
    stateRef.current = state;
    const isMount = useRef(false);
    useEffect(() => {
        isMount.current = true;
        return () => {
            isMount.current = false;
        };
    }, []);
    useEffect(() => {
        var _a;
        const handler = (data) => {
            if (!isMount.current) {
                // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
                // TODO: 需要加个 example 测试
                setTimeout(() => {
                    dispatcher.data[namespace] = data;
                    dispatcher.update(namespace);
                });
            }
            else {
                const currentState = selectorRef.current
                    ? selectorRef.current(data)
                    : data;
                const previousState = stateRef.current;
                if (!isEqual(currentState, previousState)) {
                    setState(currentState);
                }
            }
        };
        (_a = dispatcher.callbacks)[namespace] || (_a[namespace] = new Set());
        dispatcher.callbacks[namespace].add(handler);
        dispatcher.update(namespace);
        return () => {
            dispatcher.callbacks[namespace].delete(handler);
        };
    }, [namespace]);
    return state;
}
//# sourceMappingURL=test.js.map