# nestjs

## nest cli

> nest g <schematic> <name> [options]

举个栗子：
nest g resource xxx     // 生成xxx模块的完整模板文件
nest g controller xxx   // 单独生成xxx模块的controller
nest g module xxx       // 单独生成xxx模块的module
nest g service xxx      // 单独生成xxx模块的service

## Controllers

controller 负责处理 requests 和返回 responses

controller模块下的路由映射与装饰器方法有关，和类方法名无关，如果装饰器方法（如@Get）重复，取第一个；如果需要定制路由，可以使用 @Get('/foo') 的装饰器方法映射不同的类方法，注意顺序很重要，路由规则匹配到多种类方法的话，取第一个匹配到的类方法

## 概念

IOC（Inverse Of Control）: class 上声明依赖了啥，然后让工具去分析我声明的依赖关系，根据先后顺序自动把对象创建好了，然后组装起来

providers 提供可注入的实例，provider 即token参数声名以及可注入实例，默认的token就是class，这样不用@Inject来指定注入的token;除了可以用 useClass 指定注入的 class，还可以用 useValue 直接指定注入的对象

## 装饰器

@Module 声明模块
@Controller 声明 Controller
@Injectable 声明 Provider
@Inject 属性注入，参数为 Provider的token 或 class
@Optional 表示可注入也可不注入
@Global 声明为全局
@Catch 指定处理的异常
@UseFilters 声明 Filters
@UseGuards 声明 Guards
@UseInterceptors 声明 Interceptors
@UsePipes 声明 Pipes
@Param 提取路由中的参数
@Query 提取query中的参数
@Body 提取 body 中的值
@SetMetadata 指定 metadata
@Headers 获取请求头
@Ip 提取请求的 IP
@Session 提取请求的 session, 但是要安装 express-session 中间件
@Req 提取请求头
@Res 提取响应头
@Next 当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler
@HttpCode 修改状态码
@Header 修改响应头
@Redirect 指定路由重定向
@Render 指定渲染模板和数据

applyDecorators 可以调用组合其他装饰器
createParamDecorator 自定义参数装饰器
``` ts
const MyHeaders = createParamDecorator( 
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.headers[data] : request.headers;
  }
)
```