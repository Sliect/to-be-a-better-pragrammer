# CI/CD

## Github Actions

Workflow(工作流): 由一个或多个 Jobs 组成，定义在.github/worksflow 中的 Yaml 文件中
Event: 触发工作流执行的特定运动，例如代码提交后触发工作流执行的 Push 事件、Pull requeset 事件、推送代码到启用了 Github Pages 对应的分支时触发执行的事件等
Runner: 用于运行 Job 的服务器
Job: 一个工作流程可以包含一个或多个相互独立的 Job,它们可以并行或顺序执行
Step: 每一个 Job 可以包含多个可执行的 Step, 这些 Step 可以是 Shell 脚本命令，也可以是 Github Actions 中可复用的 Action
Action: Action 可以理解为插件，主要用于封装可复用的复杂执行流程，并且 Action 也可以使用 Node 脚本进行设计

```yml
# .github/workflows/ci.yml
# 当前的 ci.yml（.yaml） 文件是一个 workflow，必须放置在项目的 .github/workflows 目录下

# name: 当前 workflow 的名称
name: ci

# Event
# 定义 Push 事件，当 demo/**、feat/** 和 fix/** 分支提交代码时触发当前工作流
# 这里只是一个分支设置示例，理论上除了 gh-pages 分支外，任何分支触发 Push 事件都应该执行 CI 流程
# 因此这里也可以反向利用 branches-ignore 排除 gh-pages 分支进行设置
on:
  push:
    branches:
      - demo/**
      - feat/**
      - fix/**

# Job
# 当前 ci 只需要在一个 job 中完成
jobs:
  # job id，每一个 job 都有自己的 id，可用于 needs 进行继发执行
  # 例如以下示例中，deploy 必须依赖 test 和 build 执行完成
  # jobs:
  #   test:
  #   build:
  #     needs: test
  #   deploy:
  #     needs: [test, build]
  test:
    name: CI 执行流程

    # Runner
    # 在 Linux 环境中运行
    runs-on: ubuntu-latest

    # Step
    steps:
      # Step1
      - name: 下载 Github 仓库
        # Action
        # 这里使用社区提供的通用 Action
        # checkout action: https: //github.com/actions/checkout
        uses: actions/checkout@v4

      # Step2
      - name: 下载和安装 Node 环境
        # setup-node action: https://github.com/actions/setup-node
        uses: actions/setup-node@v3
        # with 是当前 action 的参数
        with:
          # 在 package.json 的 engines 中我们配置了  "node": ">=16.18.1"
          # 因此这里对安装的 Node 进行版本限定
          node-version: '16.x'

      # Step3
      # 这里执行 Shell 脚本
      - name: 安装依赖
        # 需要注意 npm ci 和 npm i 的区别
        # npm ci 会在开始安装之前删除整个 node_modules 目录, 并严格按照 package-lock.json 文件中指定的版本安装依赖,不会修改 package-lock.json 文件
        run: npm ci

      # Step4
      - name: 代码校验
        run: npm run lint

      # Step5
      - name: 单元测试
        run: npm test

      # Step6
      - name: 文档构建
        run: npm run docs:build

      # Step7
      - name: 代码构建
        run: npm run build
```

```yml
# .github/workflows/cd.yml
name: cd
on:
  # 这里暂时使用 demo 分支进行单元测试报告上传测试
  push:
    branches:
      - demo/**

jobs:
  test:
    name: CD 执行流程
    runs-on: ubuntu-latest
    steps:
      - name: 下载 Github 仓库
        uses: actions/checkout@v4

      - name: 下载和安装 Node 环境
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'

      - name: 安装依赖
        run: npm ci

      - name: 代码校验
        run: npm run lint

      - name: 单元测试
        run: npm test

      # 上传测试报告
      # 具体可参考：https://github.com/marketplace/actions/coveralls-github-action
      - name: 测试报告
        uses: coverallsapp/github-action@v2

      - name: 文档构建
        run: npm run docs:build

      - name: 代码构建
        run: npm run build
```
