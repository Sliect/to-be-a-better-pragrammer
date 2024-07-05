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

```bash
# 组件库szzj-drs-components下
pnpm link --global
# 在项目下 import { DilverHeader } from 'szzj-drs-components' 即可使用本地最新代码
# 记得szzj-drs-components拉取最新代码
pnpm link --global @szzj/drs-components
# 解除软链
pnpm unlink --global @szzj/drs-components
# 查看全局生成的软链
pnpm ls --global
```