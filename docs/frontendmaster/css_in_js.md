# css in js

CSS-in-JS 就是将应用的 CSS 样式写在 JavaScript 文件里面

[playground](https://www.cssinjsplayground.com/)

[各个库的对比](https://github.com/michelebertoli/css-in-js#features)

``` js
// 简化原理实现
const css = styleBlock => {
  const className = someHash(styleBlock);
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .${className} {
      ${styleBlock}
    }
  `;
  document.head.appendChild(styleEl);
  return className;
};
const className = css(`
  color: red;
  padding: 20px;
`); // 'c23j4'

```

优势：  
1. 局部作用域
2. 避免无用的css代码堆积
3. 所见即所得，避免在首屏渲染的时候下载不必要的css代码
4. 基于状态的样式定义，用js代码更灵活的定义和控制
5. 更容易封装成组件库，在各个项目中兼容使用
6. 无需纠结类名

劣势：  
1. 有一定的学习成本，即学习一种全新的基于组件定义样式的思考问题方式
2. classname可读性差，定位元素位置也非常不方便
3. styled-components库的大小压缩后是12.42kB，且是运行时动态生成css代码，会有一定的性能损失
4. 大多数 css in js 库无法分离出 css文件，从而可以页面缓存


## styled-components

最热门的库，生成的选择器名字是随机 hash

缺点：无法提取 css 文件

```js
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #6772e5;
    outline: none;
    box-shadow: 0 1px 6px rgba(103, 114, 229, 0.5);
  }
`;

<Input />

// 也可以用组件 props 的用法
// 强裂推荐安装 vscode-styled-components 插件，自动填充 + 高亮 css 语法
const Div = styled.div`
  color: ${props => props.color};
  background-color: ${({ disabled }) => disabled ? 'gray' : 'white' }
`;
<Div color="red" disabled>hello</Div>

// 对象写法，同上 Div
const Div2 = styled('div')({
  color: (props: { color: string }) => props.color,
  backgroundColor: ({ disabled }: { disabled: boolean }) =>
    disabled ? 'gray' : 'white',
});
<Div2 color="red" disabled>hello</Div2>

// 继承样式
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`
const TomatoButton = styled(Button)`        
  color: tomato;
  border-color: tomato;
`

// 组件的样式插槽
const Comp = (props) => {
  return <div>
  	外层div
    <div className={props.className}>{props.children}</div>
  </div>
}
const StyledComp = styled(Comp)`
	background: red;
`

// 公共类
import { createGlobalStyle } from 'styled-components';
const GlobalStyled = createGlobalStyle`
  body: {
    margin:0;
    padding:0;
  }
`
// 放到APP根组件中
<GlobalStyled/>
```

## radium

生成的是内联样式 

```js
const styles = {
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: '1.25rem 1rem',
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
    ':focus': {
      borderColor: '#6772e5',
      outline: 'none',
      boxShadow: '0 1px 6px rgba(103, 114, 229, 0.5)'
    }
  }
}

<input style={styles.input} />
```

## react-jss

除 styled-components 外最火的 css in js 解决方案

更像在 js 中注入 css，虽然看上去有类名，页面上仍然展示hash类名，语法不像纯css，比如 'font-weight: bold'而不是fontWeight: 'bold'，styled-components 可以做到

styled-components 包32.9kB, gzip压缩后12.8kB; jss 包53.6kB , gzip压缩后 16.6kB

``` js
import React from 'react';
import injectSheet from 'react-jss';

function Login({ classes }) {
  return (
    <main className={classes.container}>
      <div className={classes.stripe} />
    </main>
  );
}

const loginStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#f6f9fc'
  },
  stripe: {
    height: '10vh',
    overflow: 'hidden',
    transform: 'skewY(-8deg)',
    transformOrigin: 0,
    background:
      'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
  }
};

export default injectSheet(loginStyles)(Login);
```
