# pnpm

高效的节省磁盘空间的包管理工具

常用命令

```
pnpm install
pnpm add xxx
pnpm xxx
```


pnpm update 更新package.json范围内的所有依赖项
pnpm up --latest 更新所有依赖项，包括package.json中不包含的依赖
pnpm update foo@2  更新foo的指定版本
pnpm remove foo


pnpm i --ignore-scripts --no-frozen-lockfile
