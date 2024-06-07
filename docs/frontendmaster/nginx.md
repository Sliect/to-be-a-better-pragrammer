# nginx

正向代理是代理客户端，反向代理是代理服务端

反向代理、负载均衡、动静分类、高可用(主服务器挂掉，自动切换到备份服务器)

Master进程管理多个Worker, Worker争抢任务进行工作

```conf
server {
    # 访问 http://example.com 时,Nginx 会自动寻找并返回 /var/www/html/frontend 目录下的 index.html 文件
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html/frontend;
        index index.html;
    }

    # 访问 http://example.com/api 时,Nginx 会将请求转发到后端服务
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

``` conf
// ~ 表示区分大小写
location ~ .*\.(html|jpg|css|js) {
  # root path;  #根目录
  # index vv.txt;  #设置默认页
  proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
  deny 127.0.0.1;  #拒绝的ip
  allow 172.18.5.54; #允许的ip           
}
```

命令
``` bash 
# 检查配置文件是否有效
nginx -t
# 重启服务
nginx -s reload
# 停止服务
nginx -s quiet 
```

## 全局块

配置影响Nginx全局的指令

## events块

配置影响Nginx服务器或与用户的网络连接

## http块

可以嵌套多个server，配置代理、缓存、日志定义等绝大多数功能和第三方模块的配置

## tips

host文件中可以设置域名到ip地址

