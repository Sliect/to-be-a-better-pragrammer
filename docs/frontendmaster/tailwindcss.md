# tailwindcss

核心特点：功能类优先（utility-first）

Tailwind CSS的工作原理是扫描所有HTML文件、JavaScript组件和任何其他模板的类名，生成相应的样式，然后将它们写入静态CSS文件。

## 优势

1. 语义化的行内样式
2. 配合 vue/react 快速开发
3. 简单易扩展新的组件
4. 无运行时

## 缺点

1. 心智负担大，需记忆的内容多（配合Tailwind CSS IntelliSense插件使用可以解决）
2. 学习成本大，团队内推行有难度
3. 不支持 IE, 支持 Edge

## quick start

cra中添加 tailwindcss
``` js
// 1. npx create-react-app my-project
// 2. cd my-project
// 3. npm install -D tailwindcss postcss autoprefixer
// 4. npx tailwindcss init -p
// 5. 修改 tailwind.config.js 如下
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// 6. 创建一个css文件，输入
@tailwind base;
@tailwind components;
@tailwind utilities;
// 7. 在根文件引入该css文件
```

umijs中启用 tailwindcss
> umi g tailwindcss

加入tailwind中不存在的工具类时，可以用 top-[117px] 来表示 top: 117px; 语法就是 [] 内部表示特定值

## 指令

```
@tailwind    注入模块
@apply       引用已存在的class, 注意不能引用伪类模块, 如 @apply hover:bg-blue-500; 应该是 .btn:hover { @apply bg-blue-500; }，如果应用的工具类带上了 !important, 则 !important被忽略
@layer       划分归属于 tailwindcss 的base、components、utilities中的哪个模块
@variants
@responsive
@screen
theme()      获取配置的值 如 .btn-blue { background-color: theme('colors.blue.500'); }  blue.500 即 blue-500
```

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}

@layer components {
  /* 尽量少用 全局共享 */
  .btn-blue {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}

@layer utilities {
  .filter-none {
    filter: none;
  }
  .filter-grayscale {
    filter: grayscale(100%);
  }
}
```

## 语法

sm   max-width: 640px;
md   max-width: 768px;
lg   max-width: 1024px;
xl   max-width: 1280px;
2xl  max-width: 1536px;

1. 全称如 float-right => float: right
2. 取值如 block => display: block
3. 属性和值各取部分如 box-border => box-sizing: border-box
4. 特殊别名如 hidden => display: none  invisible => visibility: hidden;
5. 上下左右四个值的简写如 inset-0 => top: 0; bottom: 0; left: 0; right: 0;
6. 上下或左右两个值的简写如 inset-x-0 => top: 0; bottom: 0;     inset-y-0 => left: 0; right: 0;
7. 上下左右每个值的简写为 t => top | b => bottom | l => left | r => right
8. w => width | h => height
8. 取值用px时单位为px如 top-px => top: 1px; 
9. 取值为数字时且需要(除一些不需要响应式的值如border-width等)单位时，自动用rem，换算规则为该数字除以4，该数字乘以4为px如 top-2 => top: 0.5rem; 即 top: 8px
10. 以align为开头的属性默认不用写如 items-start => align-items: start;
11. padding的简写为p, margin的简写为m 如 px-2 => padding-left: 0.5rem; padding-right: 0.5rem;
12. 控制子元素之间的距离如 space-x-2 表示除第一个子元素外每个元素距离第二个元素的距离(margin)为 0.5rem
13. 值为负数时加在开头如 -z-1 => z-index: -1
14. 字体大小 xs: 0.75rem(12px) | sm: 0.875rem(14px) | base: 1rem(16px) | lg: 1.125rem(18px) | xl: 1.25rem(20px) | 2xl: 1.5rem(24px) 行间距比字体大小稍大一个尺寸  
如 text-xs => foont-size: 0.75rem; line-height: 1rem;
15. leading 指代 line-height如 leading-3 => line-height: 0.75rem; leading-none => line-height: 1; leading-normal => line-height: 1.5;
16. truncate => overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
17. bg 表示 background
18. rounded 表示 border-radius  sm: 0.125rem(2px) | md: 0.375rem(6px) | lg: 0.5rem(8px) | xl: 0.75rem(12px) | full: 9999px;  
如 rounded => 0.25rem; rounded-md => border-radius: 0.375rem;  rounded-t-sm => border-top-left-radius: 0.125rem; border-top-right-radius: 0.125rem;
19. border-2 => border-width: 2px;
20. opacity-60 => opacity: 0.6;


## 样式配置

``` js 
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    borderRadius: {
      none: "0",
      sm: ".125rem",
      // 注意 DEFAULT 都要大写，表示不用加词缀
      DEFAULT: "0.25rem",
      lg: ".5rem",
      full: "9999px",
    },
    // 保留主题选项的默认值，但同时添加新值，请在配置文件的主题部分的extend键下添加扩展
    // 在非extend 下的配置会被全量替换
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
```