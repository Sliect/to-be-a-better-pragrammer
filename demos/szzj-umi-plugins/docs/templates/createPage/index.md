---
nav:
  title: 研发工具
  order: 3
title: 页面生成器
order: 6
group:
  title: 页面生成器
  order: 2
---

# 一、如何使用

1. 安装 `npm i @szzj/create-szpage --g`
2. 创建页面模板运行： `create-szpage`
3. 选择模板类型
4. 选择模板

# 二、参数说明

| 参数     | 参数全称   | 说明                   | 示例                     |
| -------- | ---------- | ---------------------- | ------------------------ |
| 无       | -          | 创建模板（当前目录）   | `create-szpage`          |
| `-p xxx` | `-path`    | 创建模板（xxx 目录下） | `create-szpage -p pageA` |
| `-u`     | `-update`  | 更新本地模板           | `create-szpage -u`       |
| `-v`     | `-version` | 查看版本信息           | `create-szpage -v`       |
| `-h`     | `-help`    | 帮助                   | `create-szpage -h`       |

# 三、模板开发

1. 在 git 目录[https://code.dtzhejiang.com/data/tc/g-ui/szzj-page](https://code.dtzhejiang.com/data/tc/g-ui/szzj-page)下创建模板工程，以`szzj-page-`打头
2. 项目内添加`register.json`文件，说明见下
3. 发布 npm 包，以`@szzj/page-`打头
4. 本地运行`create-szpage -u`，即可获取到新增的模板

`register.json`示例：

```
{
  "title": "高质量项目",
  "value": "page-pdp",
  "templates": [
    {
      "title": "查询列表",
      "value": "src/pages/list"
    },
    {
      "title": "详情页面",
      "value": "src/pages/detail"
    }
  ]
}
```
