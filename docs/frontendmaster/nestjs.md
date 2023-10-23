# nestjs

请求到响应
1. Middleware
2. Guard  保护路由
3. Interceptor 拦截请求
4. Pipe  验证和转换请求数据
5. Controller  接收请求、处理请求并返回响应
6. Interceptor 拦截响应
7. Exception Filter  处理应用程序中发生的异常的函数

## nest cli

> nest g <schematic> <name> [options]

举个栗子：
nest g resource xxx     // 生成xxx模块的完整模板文件
nest g controller xxx   // 单独生成xxx模块的controller
nest g module xxx       // 单独生成xxx模块的module
nest g service xxx      // 单独生成xxx模块的service

## vscode调试

``` json
// launch.json 部分配置
{
  "type": "node",
  "request": "launch",
  "name": "debug nest",
  "runtimeExecutable": "npm",
  "args": ["run", "start:dev"],
  "skipFiles": ["<node_internals>/**"],
  "console": "integratedTerminal"
}
```

## Controllers

controller 负责处理 requests 和返回 responses

controller模块下的路由映射与装饰器方法有关，和类方法名无关，如果装饰器方法（如@Get）重复，取第一个；如果需要定制路由，可以使用 @Get('/foo') 的装饰器方法映射不同的类方法，注意顺序很重要，路由规则匹配到多种类方法的话，取第一个匹配到的类方法

Controller类上可以用装饰器来指定公共的路由前缀，在其方法上指定后续路由

方法上的参数可以通过注入的方式赋值，比如 
``` ts 
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```
注入的请求对象 request 默认是 Express 的

装饰器 | 参数 
---------|----------
 @Request(), @Req() | req 
 @Response(), @Res() | res 
 @Next() | next
 @Session() | req.session
 @Param(key?: string) | req.params / req.params[key] 
 @Body(key?: string) | req.body / req.body[key]
 @Query(key?: string) | req.query / req.query[key]
 @Headers(name?: string) | req.headers / req.headers[name]
 @Ip() | req.ip
 @HostParam() | req.hosts

路由可以使用通配符

@Redirect(url) 可以跳转指定路由，但是如果方法有返回指定url，会覆盖其原先的跳转
```ts
import { Controller, Redirect } from '@nestjs/common';

@Controller()
export class CatsController {

  @Get()
  @Redirect('https://baidu.com')
  findAll() {
    // return 格式的值 不会覆盖url
    return {
      url: 'https://docs.nestjs.com/v5/';
    };
  }
}
```

子域名路由
```ts
import { Controller, Get } from '@nestjs/common';

@Controller({ host: 'api.example.com' })
export class ApiController {
  @Get()
  getApiData() {
    // 处理API请求
    return 'API数据';
  }
}

@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  getAdminDashboard() {
    // 处理管理请求
    return '管理员仪表盘';
  }
}
```

DTO推荐使用类声明
```ts
// create-cat.dto.ts 
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

// cats.controller.ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

## Providers

作为依赖项注入

```ts
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  // 作为构造器注入, private 不能省略
  constructor(private catsService: CatsService) {}

  // 作为属性注入
  @Inject(CatService)
  catsService2: CatService;

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

```ts
const connectionFactory = {
  provide: 'CONNECTION',
  // 动态创建
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  // 注入到 useFactory 的参数
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class AppModule {}
```

## Module

``` ts
@Module({
  // 引入其他模块，组合模块
  imports: [UserModule],
  // 被实例化的
  controllers: [AppController],
  // 在当前模块中共享
  providers: [AppService],
  // 给其他导入该模块的使用
  exports: [],
})
export class AppModule {}
```

@Gloabl 全局模块应该只注册一次，通常由根模块或核心模块注册

## Middleware

默认等价于 express 的中间件
```ts 
// 创建中间件
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

// 或者函数中间件
export function logger() {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
```
```ts 
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 应用中间件
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * 需实现 NestModule
 */ 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * forRoutes('/hello') 指定路由模块
     * forRoutes({ path: '/hello', method: RequestMethod.GET }) 指向特定路由
     * forRoutes({ path: '/ab*cd', method: RequestMethod.ALL }) 支持通配符
     * forRoutes(UserController) 支持Controller
     * forRoutes(UserController, '/hello') 也支持多个组合
     */ 
    consumer
      // 可以多个中间件
      .apply(LoggerMiddleware, logger)
      .exclude('/user')
      .forRoutes({
        path: '/hello',
        method: RequestMethod.GET,
      }, UserController);
  }
}

// 应用全局中间件
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

## Exception Filters

异常层会捕获应用程序内未处理的异常

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
  }
}
```
```ts
// 既可以用在类上，也可以用在方法上
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @Use(new HttpExceptionFilter())
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

// 全局使用
const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new HttpExceptionFilter());
await app.listen(3000)
```

@Catch()装饰器可以接收一个或多个异常类作为参数，指定要捕获的异常类型。如果未指定异常类型，则将捕获所有异常。当应用程序中发生指定的异常时，@Catch()装饰器将触发相应的异常过滤器，从而允许我们执行自定义的异常处理逻辑

## Pipes

ValidationPipe  
ParseIntPipe  
ParseFloatPipe  
ParseBoolPipe  
ParseArrayPipe  
ParseUUIDPipe  
ParseEnumPipe   
DefaultValuePipe  
ParseFilePipe  

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

自定义转换Pipe
```ts
// 定义
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class MyCustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // 自定义转换逻辑
    return value;
  }
}

// 使用
@Controller('example')
export class ExampleController {
  @Get(':id')
  @UsePipes(new MyCustomPipe())
  async getById(@Param('id') id: number) {
    // ...
  }
}
```

自定义校验Pipe
```ts
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // 注入后在pipe中校验
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

```
```ts
import { z } from 'zod';

// 定义schema
export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
```
```ts
@Post()
@UsePipes(new ZodValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

或者用 class-validator 和 class-transformer
```ts
import { IsString, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @Transform(value => parseInt(value, 10)) // 转换为整数
  age: number = 18; // 设置默认值
}
```
```ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(new ValidationPipe()) // 使用管道
  createUser(@Body() createUserDto: CreateUserDto) {
    // 执行创建用户的逻辑
  }
}
```

## Guards

权限验证

## Interceptors

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

## Custom decorators

``` ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}
```

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

## typeorm

1. 创建一个实体类，并为其定义属性和相应的表字段
``` ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
      unique: true,
      nullable: false,
      type: 'varchar',
      length: 100,
      default: 'description',
    })
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean
}
```
2. 配置数据库
``` ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Photo } from './entity/Photo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'fei',
  database: 'mysql-test',
  // 同步建表  
  synchronize: true,
  // 打印生产的sql
  logging: false,
  entities: [Photo],
  migrations: [],
  // Entity生命周期的订阅者
  subscribers: [],
  // 最大连接数
  poolSize: 10,
  // 驱动包
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});

```
3. 连接数据库并初始化
``` ts
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
```
4. 操作数据库
``` ts
import { Photo } from "./entity/Photo";
import { AppDataSource } from "./index";

const photoRepository = AppDataSource.getRepository(Photo);
const allPhotos = await photoRepository.find();
```
