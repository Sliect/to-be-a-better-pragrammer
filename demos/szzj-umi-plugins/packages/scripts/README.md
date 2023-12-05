# @szzj/script-tools

## feature

### npx @szzj/script-tools irs-build

使用 npx @szzj/script-tools irs-build 生成用于 IRS 发布的虚拟 html 应用工程。

### npx @szzj/script-tools sass2less

使用 npx @szzj/script-tools sass2less 将工程中的 .sass 文件转换为 .less 文件。

对原 .scss 文件中使用的 @mixin, @include 需要手动进行修改。

比如：

```sass
@mixin status-icon($bgColor) {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 2px 5px 2px 0;
  background-color: $bgColor;
  border-radius: 3px;
}

@mixin status-icon-success {
  @include status-icon(rgba(109, 212, 0, 1));
}
```

需要修改成：

```less
.status-icon() {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 2px 5px 2px 0;
  border-radius: 3px;
}

.status-icon-success {
  background-color: rgba(109, 212, 0, 1);

  .status-icon();
}
```
