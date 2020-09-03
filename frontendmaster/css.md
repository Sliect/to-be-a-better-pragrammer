# CSS

## 可见格式化模型

盒模型：外边距, 边框, 内边距, 内容

清除浮动会给元素添加外边距，为前面的浮动元素留出足够的空间

行内元素给父元素共吸纳的高度根据行高计算

margin-left: auto; 可以使元素左边外边距填满，来到最右边

## grid布局

容器属性：  
grid-template-columns 列宽

grid-template-rows 行高

grid-row-gap 行间距

grid-column-gap 列间距

grid-auto-flow 子元素排列顺序

justify-items 单元格内容水平位置

align-items  单元格内容垂直位置

justify-content 整个内容区域在容器里面的水平位置

align-content  整个内容区域的垂直位置

项目属性：  
grid-column-start 左边框所在的垂直网格线（从1开始）

grid-column-end 右边框所在的垂直网格线

grid-row-start  上边框所在的水平网格线

grid-row-end    下边框所在的水平网格线

grid-column   grid-column-start / grid-column-end

grid-row      grid-row-start / grid-row-end

justify-self, align-self  适用于单个

## 浏览器解析css

1. 构建DOM对象和CSSOM对象，每个CSS选择符匹配一个DOM节点，浏览器计算最终样式

2. 渲染树

3. 布局/重排，计算位置

4. 绘制、合成与呈现