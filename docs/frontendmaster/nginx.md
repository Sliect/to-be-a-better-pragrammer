# nginx

正向代理是代理客户端，反向代理是代理服务端

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
