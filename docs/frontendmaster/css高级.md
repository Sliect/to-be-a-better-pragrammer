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

