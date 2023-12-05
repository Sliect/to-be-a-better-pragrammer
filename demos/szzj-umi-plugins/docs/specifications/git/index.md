---
nav:
  title: 编码规范
  order: 1
title: Git 操作规范
order: 6
group:
  title: 编码规范
  order: 1
---

### 提交规范

git 提交时，请采用 git commit -m "[type]: [message]" 形式。可选的 type 值有：

| type     |                                       描述                                        |
| :------- | :-------------------------------------------------------------------------------: |
| feat     |                                      新功能                                       |
| fix      |                                     修复 bug                                      |
| docs     |                                       文档                                        |
| style    |                   格式（不影响代码运行的变动，空格，格式化等）                    |
| refactor |                 重构（即不是新增功能，也不是修改 bug 的代码变动）                 |
| perf     |                             性能 (提高代码性能的改变)                             |
| test     |                                     增加测试                                      |
| build    |               影响构建系统或外部依赖项的更改(maven, gradle, npm 等)               |
| ci       |                            对 CI 配置文件和脚本的更改                             |
| chore    | 对非 src 和 test 目录的修改（日常事务; 例行工作; 令人厌烦的任务; 乏味无聊的工作） |
| revert   |                                       回滚                                        |
