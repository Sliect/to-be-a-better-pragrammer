# nginx

``` 
// ~ 表示区分大小写
location ~ .*\.(html|jpg|css|js) {
  #root path;  #根目录
  #index vv.txt;  #设置默认页
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
