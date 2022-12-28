# htpp

应用层 => 传输层 => 网络层 => 网络接口层

应用层：http、ftp、dns等网络协议  
传输层：tcp、udp传输控制协议，分片后添加TCP头部  
网络层：ip协议的作用寻址和路由，添加IP头部  
网络接口层：添加MAC头部后封装成 Data Frame, MAC头部在以太网中使用      

