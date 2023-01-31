# nodejs

Module Wrapper

``` js
// exports 是 module的引用
(function(exports, require, module, __filename, __dirname) {})
```

## File

- fs.dir 操作目录的子模块，提供dir.read、dir.readSync等 API 来读取目录信息
- fs.createReadStream() 创建一个读文件流对象
- fs.createWriteStream() 创建一个写文件流对象
- fs.stat(), fs.statSync() 读取文件信息，包括文件状态、权限、创建时间、修改时间等信息
- fs.appendFile(), fs.appendFileSync() 追加内容到文件
- fs.chmod(), fs.chown() 改变文件权限、权限组
- fs.copyFile(), fs.copyFileSync() 拷贝文件
- fs.mkdir(), fs.mkdirSync() 创建目录
- fs.rename(), fs.renameSync() 修改文件名
- fs.rmdir(), fs.rmdirSync() 删除目录
- fs.unlink(), fs.unlinkSync() 删除文件
- fs.watchFile() 监听文件内容变化
- fs.writeFile(), fs.writeFileSync() 写入文件

## Net

## Http

## URL

## Path

## Process

## Buffer

## Console

## Crypto

## Events