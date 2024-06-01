# shadcn-ui

通过 cli 命令将组件下载到本地，该组件是样式抽离的，需要自己定制化样式

## quick start

```json
// tsconfig.json
{
  "compilerOptions": {
    // 必须在tsconfig.json中配置如下
    // 否则 components 不会创建到 src 目录下, 而是新建一个 @ 目录
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

先要集成 tailwindcss
> pnpm install -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p

``` js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

生成components.json文件，并且会自动在 tailwindcss.config.ts 中注册变量
```bash
npx shadcn-ui@latest init
```

如果要新增一个button组件
```bash
npx shadcn-ui@latest add button
```

变量规则如, 默认会在 app/globals.css 中注册
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;

    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }
}
```