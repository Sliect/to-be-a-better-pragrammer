## 数字浙江 react 组件库模板

### 快速开始

#### 启动

```shell
# 本地环境启动
cnpm run dev
```

本地访问 http://localhost:8000。

#### 打包发布

```shell
cnpm run build
cnpm publish
```

#### 静态站点打包

```shell
cnpm run docs:build
```

### dumijs@2 问题跟进

1. [自动 API 表格](https://d.umijs.org/guide/auto-api-table) 目前处于试验经验，设置 apiParser、resolve 配置项会导致源代码文件加载异常。即，当源码发生编译问题时，就会使进程退出，不便于调试组件。因此，暂时统一不适用自动 API 表格能力。更多可参考 [dumijs issue#1337](https://github.com/umijs/dumi/issues/1317)；
2. hash 路由暂不支持：https://github.com/umijs/dumi/commit/9838d7c906ff3f76dbfdd31f8067cdad57b38acc
