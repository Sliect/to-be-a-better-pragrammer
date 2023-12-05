---
title: Upload 文件上传
---

# Upload

文件上传。

## features

- antd 功能
- 集成文件类型、大小、上传文件数目校验
- 上传失败文件不会显示在预览列表中
- 上传图片按钮样式随 listType 切换
- 集成添加水印

## demos

### demo 1: 文件校验

<code src="./upload/validate" />

### demo 2: 上传数量

<code src="./upload/max" />

### demo 3: 详情

<code src="./upload/detail" />

### demo 4: 超出最大

<code src="./upload/maxSize" />

## props

| 属性      |  类型  |    默认值 |                                           意义 |
| :-------- | :----: | --------: | ---------------------------------------------: |
| fileName  | string | undefined | 若 name 在 Upload 或 FormItem 表现不一致时使用 |
| max       | number | undefined |                                   最大上传数量 |
| maxSize   | number | undefined |                                   最大上传兆数 |
| watermark | string | undefined |                                       水印文字 |
