## 数字浙江 h5 端应用模板

### 快速开始

#### 启动

```shell
# 本地环境启动
cnpm run start
cnpm run dev
```

本地访问 http://localhost:8000。

#### 打包

```shell
# 测试环境打包
cnpm run build
cnpm run build:dev

# 生产环境打包
cnpm run build:prod
```

### 默认集成

- [@szzj/umi-plugin-h5](http://10.145.11.75:8080/gui/szzj-ones#/plugins/h5): 您可以配置开启错误页面等能力；
- [@szzj/umi-plugin-request](http://10.145.11.75:8080/gui/szzj-ones#/plugins/request): 您可以使用 import { request } from 'umi' 形式调用远程接口，以及插件提供的其他功能；
- [@szzj/utils](http://10.145.11.75:8080/gui/szzj-utils/#/): 您可以使用 @szzj/utils 提供的 lodash 工具函数、表单校验、加解密等能力；

### 推荐

- 推荐使用 [@szzj/umi-plugin-model](http://10.145.11.75:8080/gui/szzj-ones#/plugins/model) 机制共享全局数据；

### 代码美化

基于 [husky](https://typicode.github.io/husky/#/), [lint-staged](https://www.npmjs.com/package/lint-staged)，工程在提交过程中会自动检查编码格式。这一过程，并不会尝试自动修改文件的编码格式。

您可以通过配置 vscode 扩展的方式在保存时自动美化代码（请参照[新人手册]()），也可以执行 cnpm run prettier --write 命令加以美化。

### 编码规范检查

基于 [husky](https://typicode.github.io/husky/#/), [lint-staged](https://www.npmjs.com/package/lint-staged)，工程在提交过程中会自动检查增量提交的 javascript, css 等文件。这一过程，并不会尝试自动修复代码。为此，您可以使用以下命令进行手动修复：

```bash
# 修复 javascript 代码
cnpm run lint:es-fix

# 修复 css 代码
cnpm run lint:style-fix
```

执行以上两个命令后，eslint 或 stylelint 就会对可修复的代码进行修改。

当然，您也可以基于以下两个命令对整个工程或指定工程文件进行编码规范检查：

```bash
# 检查 javascript 代码
cnpm run lint:es

# 检查 css 代码
cnpm run lint:style
```

对于不能修复的代码，请参照 [编码规范](http://10.145.11.75:8080/gui/szzj-ones#/specifications) 进行修改。如果需要屏蔽某一行的代码检查，可使用如下注释：

```tsx | pure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Tab({ key, title }: ITabProps) {
  return null;
}
```

#### 注意

1. husky 需要配置 git 钩子，因此对模板工程执行 git init 要先于 cnpm install 等安装依赖命令；
2. 如部分工程文件确实不需要检查，比如 resources 目录，可将 resources 目录添加到 .eslintignore, .stylelintignore, .prettierignore 文件中；

### 测试

```shell
# test 测试
cnpm run test
```

### git 提交

工程会使用 umi 提供的机制校验提交消息，请遵循 [Git 操作规范](http://10.145.11.75:8080/gui/szzj-ones#/specifications/git) 约定的消息格式进行提交。
