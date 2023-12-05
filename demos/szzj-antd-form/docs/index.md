---
title: 首页
order: 1
hero:
  title: szzj-antd-form@2
  desc: antd4 表单封装
  actions:
    - text: 指南
      link: /fields/auto-complete
---

## ✨ Features

- AutoComplete ~ Upload 等表单控件内置 FormItem 特性，简化编写
- 提供 valueType="mobileCn" 便捷启动校验能力
- 提供 greateThen、greateThenEqual、lessThen、lessThenEqual 等关联校验能力
- 提供 CheckboxWithOther、RadioWithOther、SelectWithOther 含其他选项的控件
- 提供 ModalForm、DrawerForm、QueryForm 等组件
- List 列表。

## 📦 Install

```
npm i @szzj/antd-form --save
```

## 🔨 Usage

```
import { Form, Upload } from '@szzj/antd-form';

export default () => {
  return (
    <Form detail labelCol={3} initialValues={{avator: [{
      name: '图片', url: 'www.baidu.com', uid: 'www.baidu.com',
    }, {
      name: '图片1', url: 'www.baidu1.com', uid: 'www.baidu1.com',
    }]}}>
      <Upload name="avator" label="上传图片" renderDetailItem={(tag) => {
        return tag ? <a href={tag.url} target="_blank">{tag.name}</a> : null;
      }} />
    </Form>
  )
}
```

## 🖥 Development

```
$ git clone http://59.202.42.100/data/tc/g-ui/szzj-antd-components/szzj-antd-form.git
$ npm install
$ npm run docs
```

打开浏览器访问 http://127.0.0.1:8000。
