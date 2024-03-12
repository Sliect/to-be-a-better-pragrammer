# eslint

ESLint 是一个可配置的 JavaScript 检查器, 发现并修复 JavaScript 代码中的问题

> pnpm i eslint eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
> pnpm i prettier eslint-plugin-prettier eslint-config-prettier -D

配置参考如下

```js
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
      },
    ],
  },
};

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "all",
  "endOfLine": "lf"
}
```

### parser - 解析器

eslint 底层用 Espress 进行 AST 解析，不支持 ts 语法解析，因此需要引入 @typescript-eslint/parser 来进行 ts 的解析

### rules

off 或 0: 表示关闭规则。
warn 或 1: 表示开启规则，不过违背规则后只抛出 warning，而不会导致程序退出。
error 或 2: 表示开启规则，不过违背规则后抛出 error，程序会退出。

当 eslint 和 prettier 规则冲突时，在 eslint 中手动配置 Prettier 规则;
vscode偶尔会抽风报错，请重启vscode尝试

```js
// .eslintrc.cjs
// 比如 eslint 中的 trailingComma 和 prettier中的 trailingComma冲突
{
  rules: [
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
      },
    ],
  ];
}
```

### plugins

因为默认没有处理 ts 的规则，可以引入 @typescript-eslint/eslint-plugin 插件

### extends

继承另外一份 ESLint 配置，可以配置为一个字符串，也可以配置成一个字符串数组

```ts
module.exports = {
  "extends": [
    // 第1种情况:继承自eslint
    "eslint:recommended",
    // 第2种情况:继承自类似eslint-config-xxx的npm包，一般配置的时候可以省略 `eslint-config`
    "standard"
    // 第3种情况，可以省略包名中的 `eslint-plugin`
    // 格式一般为: `plugin:${pluginName}/${configName}`
    "plugin:react/recommended"
    "plugin:@typescript-eslint/recommended",
  ]
}
```

### env 和 globals

```ts
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    // false或readonly表示不可重写, true或writable表示可重写
    $: false,
  },
};
```

### stylelint

安装依赖

```ts
pnpm i stylelint stylelint-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
```

配置如下

```ts
// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 scss 版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
  ],
};
```

```json
{
  "scripts": {
    // 整合 lint 命令
    "lint": "npm run lint:script && npm run lint:style",
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src",
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\""
  }
}
```

### husky

安装

```ts
pnpm i husky lint-staged -D

pnpm exec husky init
```

```json
// package.json
{
  "scripts": {
    // 首次配置需要先npm run prepare 生成配置依赖
    "prepare": "husky"
  },
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts}": ["npm run lint:script", "git add ."],
    "**/*.{css,scss}": ["npm run lint:style", "git add ."]
  }
}
```

在 .husky/pre-commit 下将执行命令改成 npx --no -- lint-staged , lint-staged 可以将暂存区的提交做检查

### commitlint

安装

```ts
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

新建 .husky/commit-msg

```
npx --no -- commitlint --edit "$1"
```
