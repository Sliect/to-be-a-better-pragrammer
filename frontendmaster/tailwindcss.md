# tailwindcss

## 优势

1. 语义化的行内样式
2. 配合 vue/react 快速开发
3. 简单易扩展新的组件

## 缺点

1. 心智负担大，需记忆的内容多

## quick start

```js
{
  // 1. yarn add tailwindcss
  // 2. 在 .umirc 中引用    在其他脚手架中可能还需要引入 postcss 相关配置
  extraPostCSSPlugins: [
    require('tailwindcss'),
  ],
}

// 3. 在 global.css 中
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

// 4. 关闭 vscode 中的 css validate 检查

// 5. npx tailwindcss init （可选） 配置参数
// https://github.com/tailwindlabs/tailwindcss/blob/v1/stubs/defaultConfig.stub.js
```

## 指令

```
@tailwind    注入模块
@apply       引用已存在的class, 注意不能引用伪类模块, 如 @apply hover:bg-blue-500; 应该是 .btn:hover { @apply bg-blue-500; }
@layer       划分归属于 tailwindcss 的base、components、utilities中的哪个模块
@variants
@responsive
@screen
theme()      获取配置的值 如 .btn-blue { background-color: theme('colors.blue.500'); }
```

