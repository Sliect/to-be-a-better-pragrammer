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

## css属性排列顺序

布局 => 尺寸 => 界面 => 文字 => 交互  

1. 布局
显示：display visibility  
溢出：overflow overflow-x overflow-y  
浮动：float clear  
定位：position left right top bottom z-index  
列表：list-style list-style-type list-style-position list-style-image  
表格：table-layout border-collapse border-spacing caption-side empty-cells  
弹性：flex-flow flex-direction flex-wrap justify-content align-content align-items align-self flex flex-grow flex-shrink flex-basic order  
多列：columns column-width column-count column-gap column-rule column-rule-width column-rule-style column-rule-color column-span column-fill column-break-before column-break-after column-break-inside  
栅格：grid-columns grid-rows

2. 尺寸
模型：border-box  
边距：margin margin-left margin-right margin-top margin-bottom  
填充：padding padding-left padding-right padding-top padding-bottom  
边框：border border-width border-style border-color border-colors border-[direction]-<param>  
圆角：border-radius border-top-left-radius border-top-right-radius border-bottom-left-radius border-bottom-right-radius  
框图：border-image border-image-source border-image-slice border-image-width border-image-outset border-image-repeat  
大小：width min-width max-width height min-height max-height  

3. 界面属性
外观：appearance  
轮廓：outline outline-width outline-style outline-color outline-offset outline-radius outline-radius-[direction]  
背景：background background-color background-image background-repeat background-repeat-x background-repeat-y background-position background-position-x background-position-y background-size background-origin background-clip background-attachment bakground-composite  
遮罩：mask mask-mode mask-image mask-repeat mask-repeat-x mask-repeat-y mask-position mask-position-x mask-position-y mask-size mask-origin mask-clip mask-attachment mask-composite mask-box-image mask-box-image-source mask-box-image-width mask-box-image-outset mask-box-image-repeat mask-box-image-slice  
滤镜：box-shadow box-reflect filter mix-blend-mode opacity  
裁剪：object-fit clip  
事件：resize zoom cursor pointer-events touch-callout user-modify user-focus user-input user-select user-drag  

4. 文字属性
模式：line-height line-clamp vertical-align direction unicode-bidi writing-mode ime-mode  
文本：text-overflow text-decoration text-decoration-line text-decoration-style text-decoration-color text-decoration-skip text-underline-position text-align text-align-last text-justify text-indent text-stroke text-stroke-width text-stroke-color text-shadow text-transform text-size-adjust  
字体：src font font-family font-style font-stretch font-weight font-variant font-size font-size-adjust color  
内容：overflow-wrap word-wrap word-break word-spacing letter-spacing white-space caret-color tab-size content counter-increment counter-reset quotes page page-break-before page-break-after page-break-inside  

5. 交互模式
模式：will-change perspective perspective-origin backface-visibility  
变换：transform transform-origin transform-style  
过渡：transition transition-property transition-duration transition-timing-function transition-delay  
动画：animation animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-play-state animation-fill-mode  
