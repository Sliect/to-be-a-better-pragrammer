# bugs

报错信息: node:internal/crypto/hash:68
原因: nodejs迁移了crypto 哈希算法
解决方案: 在命令行前加以下代码
> cross-env NODE_OPTIONS=--openssl-legacy-provider 

