# css高级

## background

linear-gradient 的颜色可以是透明色，用伪元素做一个渐变的图层  
使用场景：渐变消失

不同颜色直接过渡时，容易产生锯齿效果，可以预留一些渐变空间

多个图层组合

conic-gradient 用百分比可以实现各种贴图

利用角向渐变 repeat 配合 position 完成特殊图案，实现让左上角的四分之一变成四个角的样式

利用repeating-radial-gradient 或 repeating-conic-gradient 配合小单位实现造型迥异的图案

利用transform实现渐变的动画
``` css
div {
  /* 视口 */
  position: relative;
  overflow: hidden;
  width: 180px;
  height: 180px;
  margin: 40px auto;
    
  &::before {
    /* 渐变图层 */
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    bottom: -100%;
    right: -100%;
    background: linear-gradient(45deg,  #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
    background-size: 100% 100%;
    animation: bgposition 8s infinite linear alternate;
    z-index: -1;
  }
}


@keyframes bgposition {
    0% {
        transform: translate(30%, 30%);
    }
    25% {
        transform: translate(30%, -30%);
    }
    50% {
        transform: translate(-30%, -30%);
    }
    75% {
        transform: translate(-30%, 30%);
    }
    100% {
        transform: translate(30%, 30%);
    }
}
```

利用 filter 进行渐变动画
```css
@keyframes huerotate {
    100% {
        filter: hue-rotate(360deg);
    }
}
```

background-clip  背景色填充规则 border-box、padding-box、content-box、text
```
(container width - image width) * (position x%) = (x offset value)
(container height - image height) * (position y%) = (y offset value)
```
如果 background-size 等于给定轴的容器大小，那么该轴的 百分比 位置将不起作用

用 background-clip: text 给动画图层

background-attachment: local 表示默认情况,背景相对元素内容固定
background-attachment: fixed 表示背景图像的位置在视口内固定
background-attachment: scroll 表示背景图像的位置随着包含它的区块滚动

用 background-attachment: fixed 实现滚动视差
用 background-attachment: local, scroll; 实现初始和滚动两种状态

## mask

遮罩图层可以用来作为一个新图层

## clip-path

不规则连线，区域内的显示，区域外的隐藏

clip-path的动画变化，连接点数量必须一样多，否则无法生成补间动画

## box-shadow

利用阴影复制自身

box-shadow比较消耗性能，如果是其动画，建议用伪元素配合opacity去实现动画

## filter

filter 滤镜作用于当前元素

### 滤镜效果

backdrop-filter 滤镜作用于元素背后区域的所有元素，可以作为一个图层蒙版移动

backdrop-filter 只有在元素或背景有透明度的情况下才会生效

contrast() 对比度滤镜
``` css
.btn:hover,
.img:hover {
    transition: filter .3s;
    filter: contrast(130%);
}
```

drop-shadow() 不单单针对自身元素，还会向下寻找所有子元素的形状，对其设置阴影

gray-scale() 置灰

pointer-events: none; 让遮罩层不阻挡事件的点击

### 组合滤镜

contrast 配合 内部blur，实现融合的效果

## mix-blend-mode 和 background-blend-mode

图层混合模式

background-blend-mode 是单个元素背景的混合
mix-blend-mode 是多个元素重叠背景的混合

## transition

transition-property
transition-duration
transition-timing-function
transition-delay

``` html
<div class="g-container">
    <div class="g-circle">Hello CSS</div>
</div>

<style>
.g-circle {
    transition: transform .3s;
}
/* 
 * 防止元素移动后，失去hover状态后回归原位，出现抖动
 * 解决方案: 将hover目标元素和运动元素分离
 */
.g-container:hover .g-circle {
    transform: translate(0, -20px);
}
</style>
```


``` css
ul {
    opacity: 0;
    transition: all .3s;
    /* 取消hover态 延迟1s后取消 */
    transition-delay: 1s;
}
.g-button:hover ul {
    opacity: 1;
    /* hover态 立即激活 */
    transition-delay: 0s;
}
```

CSS @property 可以让原本不支持过渡效果的属性支持过渡

## animation

animation-direction：设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行
animation-iteration-count：设置动画重复次数，可以指定 infinite 无限次重复动画
animation-play-state：允许暂停和恢复动画
animation-fill-mode：元素不响应动画(none), 动画未开始或暂停的第一帧(backwards), 动画结束的第一帧(forwards), 开始之前为第一帧且结束后为最后一帧(both)

animation-delay 的值可以为负值，让动画提前运行

三次贝塞尔曲线缓动和步骤缓动，其实就是对应的补间动画和逐帧动画

``` html
<ul>
    <li style="--end: 150px; --color: red;"></li>
    <li style="--end: 200px; --color: blue;"></li>
    <li style="--end: 120px; --color: green;"></li>
</ul>

<style>
/* css变量 */
@keyframes move {
    60%,
    100% {
        transform: translate(var(--end));
        background: var(--color);
    }
}
</style>
```

## 性能篇

Javascript执行改变DOM => Style样式匹配 => Layout重排 => Paint重绘 => Composite渲染层合并

尽可能减少重排和重绘，可以提高CSS的性能

## svg

svg 的stroke-dash-array, stroke-dashoffset 配合css可以做动画效果

配合 drop-shadow() 和 hue-rotate() 给颜色动画

[svg-path](https://yqnn.github.io/svg-path-editor/)

1. Moveto（M）：将画笔移动到指定坐标点，作为路径的起点。
2. Lineto（L）：绘制一条直线，参数为终点坐标。
3. Horizontal Lineto（H）：绘制一条水平线，参数为终点的 x 坐标。
4. Vertical Lineto（V）：绘制一条垂直线，参数为终点的 y 坐标。
5. Curve（C）：绘制一条三次贝塞尔曲线，需要给出起始点、控制点和终点三个坐标。
6. Smooth Curve（S）：绘制一条光滑的三次贝塞尔曲线。
7. Quadratic Bézier Curve（Q）：绘制一条二次贝塞尔曲线。
8. Smooth Quadratic Bézier Curve（T）：绘制一条光滑的二次贝塞尔曲线。
9. Elliptical Arc（A）：绘制一个椭圆弧形。

如何计算路径的周长？
``` html
<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path id="svgpath" d="...">
</svg>

<script>
var obj = document.querySelector("#svgpath");
// 计算path的周长
var length = obj.getTotalLength();
</script>
```

