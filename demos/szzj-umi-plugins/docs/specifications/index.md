---
nav:
  title: 编码规范
  order: 1
title: 编码规范
order: 1
---

经由数据部前端小伙伴的共同努力，我们在 2023 年 6 月初整理完成了数据部前端团队的编码规范：

- [React 编码规范](/specifications/react)
- [Javascript 编码规范](/specifications/javascript)
- [CSS 编码规范](/specifications/css)
- [HTML 编码规范](/specifications/html)
- [无障碍编码规范](/specifications/a11y)

这些编码规范并不以团队成员的个人意志而转移，需要团队整体的经营和践行。

## 三条规约

### 编码逻辑

1. 对于迭代较稳定的长期项目（复杂模块或工程），尽可能使用 UML 等工具设计模块关系图及逻辑流程图；

<Badge type="error">原因</Badge>

系统是一个熵增的过程，良好的设计可以避免熵增过程中的冗余或结构不妥，比如打分工具在熵增过程中就走向了失控的状态，加载及转换数据既会在 context 中出现，也会在内部模块中出现；模块间的关联性及其内部的职责边界也不是很妥善；

2. 对于迭代较稳定的长期项目（无论复杂与否），尽可能使用 types 类型约束全工程（特别是业务字段），以免编码中的业务意义消失；

<Badge type="error">原因</Badge>

以交接的打分工具为例，其中权限判断使用了 userInfo.roleId > 2，这个业务意义就消失了，单纯看代码，没法感知哪种角色持有权限，另外一点，一旦系统中添加新的角色，这个处理逻辑也会出现错误。此外，视图部件中的大量以 any 定义的类型，显然也无法表述其业务意义；

3. 对于网上找到的代码段，未经转换成 typescript 语法，不得投放使用；

<Badge type="error">原因</Badge>

网上找到的代码段未经斟酌处理，容易引起老旧语法、typescript 类型不健全、语法美化等问题；

### 样式处理

1. 使用 less 替换 sass。

<Badge type="error">原因</Badge>

就目前对 css 扩展语言的使用上，sass 较 less 没有显著的优势；
node-sass 各版本均需要匹配指定版本的 node.js，不然会导致 node-gyp 报错。比如，本地开发环境为了使用 node.js 的新特性，对 node.js 做了升级之后，会出现与既往项目 node-sass 不兼容的情景。本地环境可使用 nvm 切换 node.js 版本。但是 jenkins 环境上安装的 node.js 版本是固定的，动态切换极为不方便；

2. 应用内启用 css module 小驼峰式，组件库不启用 css module。

<Badge type="error">原因</Badge>

开启 css module 功能后，js 脚本文件和 css 样式文件的依赖关系较为清晰。如果不开启，则其依赖关系极易导致混乱，比如咨询部交接项目的一个页面会嵌套三四层组件，其样式均在页面容器层进行维护，也就是 A 组件引用了 B 组件，B 组件又引用了 C 组件，C 的样式在 A.less 中设置；

组件库不启用 css module，即样式的类名是固定的，这样作为应用内的依赖时，可通过 global 样式针对性地修改其样式。个别场景中，对于应用内较为通用的 components，也可以不启用 css module，其一是提取到组件库中不需要额外修改，其二是可以通过 global 样式调整内部属性；

对于业务组件，可通过 props 透传 className, style 至内部组件中，比如 ant design 透传到模态框蒙层的 maskStyle；

3. 不得全量复制蓝湖、figma 等设计稿中的样式。

<Badge type="error">原因</Badge>

设计稿中的样式会混杂不必要的样式信息，比如 font-family, line-height。复制之后，其一造成了冗余，其二不便于作便捷的全局性调整；
