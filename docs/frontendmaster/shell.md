# shell

## 变量

``` bash
# 赋值
name="123"
# 使用引用
echo ${name}
# 设置只读
readonly name
# 删除变量, 不能删除只读变量
unset name
# $0 表示脚本的名称，$1, $2, 等表示脚本的参数
echo $0
# 获取字符串长度
echo ${#name}
# 提取子字符串
echo ${name:1:3}
# 查找字符串i或o的位置, 从1开始, 找不到为0
echo `expr index ${name} io`

# 数组
arr=("hi" "what" "is" "up")
# 读取数组
echo ${arr[1]}
# 获取所有元素
echo ${arr[@]}
# 获取数组长度
echo ${#arr[@]}

# 关联数组 类似对象的东西
declare -A obj=(["key1"]="value1" ["key2"]="value2" ["key3"]="value3")
# 取值
echo ${obj["key1"]}
# 取键值
echo ${!obj[@]}
```

## 运算&流程控制
``` bash
a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"
# 这里*是特殊符号，需要转义下
val=`expr $a \* $b`
echo "a * b : $val"

# [[  ]] 中间必须空格隔开
# -eq -ne -gt -lt -ge -le && ||
if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
elif [[ $b -gt 0 ]]
then
  echo "$b > 0"
else
  echo "返回 false"
fi

# 循环
for str in This is a string
do
  echo $str
done

int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

## 函数

``` bash
funcName() {
  echo "第一个参数为 $1"
  echo "第二个参数为 $2"
  echo "第三个参数为 $3"
  echo "参数总数有 $# 个"
  echo "作为一个字符串输出所有参数 $@"
}
funcName 2 4 6 8 10
```
