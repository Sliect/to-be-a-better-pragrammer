## obsidian

obsidian_to_anki  
1. 下载 anki 和 安装 anki上的插件 AnkiConnect
2. obsidian上安装第三方插件obsidian_to_anki[]()
3. 设置 obsidian_to_anki 上的 Note Type Table 的基础行正则 
``` js
((?:[^\n][\n]?)+)\s#flashcard\s?\n*((?:\n(?:^.{1,3}$|^.{4}(?<!<!--).*))+)
```
4. Deck 指向的是 anki 软件上的牌组名

Kanban