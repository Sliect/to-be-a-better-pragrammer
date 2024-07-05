# nextjs

> pnpm create next-app

## App Router

```tsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

动态路由

``` tsx
// app/blog/[id]/page.tsx
// app/blog/[...folderName] 捕获所有的路由参数
// app/blog/[[...folderName]] 捕获所有的路由参数,包括 /blog
export default function Page({ params }) {
  return <div>My Post: {params.id}</div>;
}
```

路由组

1. 路由组的命名除了用于组织之外并无特殊意义。它们不会影响 URL 路径
2. 注意不要解析为相同的 URL 路径。举个例子，因为路由组不影响 URL 路径，所以 (marketing)/about/page.js和 (shop)/about/page.js都会解析为 /about，这会导致报错
3. 创建多个根布局的时候，因为删除了顶层的 app/layout.js文件，访问 /会报错，所以app/page.js需要定义在其中一个路由组中
4. 跨根布局导航会导致页面完全重新加载，就比如使用 app/(shop)/layout.js根布局的 /cart 跳转到使用 app/(marketing)/layout.js根布局的 /blog 会导致页面重新加载（full page load）

平行路由

``` tsx
// app/blog/@header/page.jsx
// app/blog/@footer/page.jsx

// app/blog/layout.jsx
export default function Layout({ children, header, footer }) {
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}
```