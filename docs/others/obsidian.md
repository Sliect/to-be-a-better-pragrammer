## obsidian

### 引用

```
"""
加上!后 可以把引用内容显示在当前页面
#可以引用当前页面的标题段落
^当前页面的段落引用
^^当前库中的段落引用
"""
![[foo]] 
[[#引用]]
[[#^072b59]]
[[2.js_module#^b3a47d]]
```

### 插件

obsidian_to_anki  
1. 下载 anki 和 安装 anki上的插件 AnkiConnect，插件设置 "app://obsidian.md"
2. obsidian上安装第三方插件obsidian_to_anki
3. 设置 obsidian_to_anki 上的 Note Type Table 的基础行正则 
``` js
((?:[^\n][\n]?)+)\s#flashcard\s?\n*((?:\n(?:^.{1,3}$|^.{4}(?<!<!--).*))+)
```
4. Deck 指向的是 anki 软件上的牌组名
