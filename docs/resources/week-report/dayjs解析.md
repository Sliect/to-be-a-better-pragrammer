# dayjs解析

为什么使用 Day.js ？
2kB
下载、解析和执行更少的 JavaScript，为您的代码留出更多时间。

简易
Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样。

如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js 。

不可变的
所有的 API 操作都将返回一个新的 Dayjs 对象。

这种设计能避免 bug 产生，节约调试时间。

国际化
Day.js 对国际化支持良好。但除非手动加载，多国语言默认是不会被打包到工程里的

## 解析

dayjs() // 如果参数为 Dayjs 实例，返回一个全新的克隆实例，否则尝试初始化生成一个 Dayjs 实例

dayjs(new Date()) // 等同于 dayjs()

dayjs('2022-4-4')  // ISO 8601 格式的时间戳字符串, 在ISO 8601中用于表示日期和时间的元素顺序如下:年、月、日、小时、分钟、秒和毫秒

dayjs('2018-04-13 19:18:17.040+02:00') // ISO 8601 格式, 附带时区

dayjs(1680572751765),  // 时间戳

dayjs('2023-4-4 10:0:0.000Z') // 加上 Z 表示格林尼治时间，时区为0，所以要换算成当地时区的时间

小结：支持 undefined、Date 实例、Date实例化参数、时间戳

dayjs().clone() // 所有的 Day.js 对象都是 不可变的, clone 可以复制出一个当前对象。

dayjs('2022-01-33').isValid() // true, 验证是否符合日期格式

## 取值/赋值

| 单位  | 缩写  | 详情  | 
|---|---|---|
| date  | D  | 月份里的日期  | 
| day  | d  | 星期几 (星期天0，星期六6)  |  
| month  | M  | 月份 (一月 0， 十二月 11)  |   
| year  | y  | 年份  |   
| hour  | h  | 小时  |   
| minute  | m  | 分钟  |   
| second  | s  | 秒  |   
| millisecond  | ms  | 毫秒  |   

dayjs().get('year') 
dayjs().get('y') 

dayjs().get('month') // start 0
dayjs().get('M')

dayjs().get('date')
dayjs().get('D')

dayjs().get('hour')
dayjs().get('h')

dayjs().get('minute')
dayjs().get('m')

dayjs().get('second')
dayjs().get('s')

dayjs().get('millisecond')
dayjs().get('ms')

dayjs().get('day')
dayjs().get('d')

dayjs().set('hour', 5).set('minute', 55).set('second', 15) // 支持链式调用，支持缩写

## 操作

dayjs().add(7, 'day')

dayjs().subtract(7, 'year')

dayjs().startOf('year')

dayjs().endOf('month')

## 显示

dayjs().format() // '2023-04-04T20:10:55+08:00'

dayjs('2019-01-25').diff(dayjs('2018-06-05'), 'month') // 7

## 查询

dayjs().isBefore(dayjs('2011-01-01')) 

dayjs().isSame(dayjs('2011-01-01')) 

dayjs().isAfter(dayjs('2011-01-01'))

## 插件

``` js
export default (option, dayjsClass, dayjsFactory) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.isSameOrBefore = function(arguments) {}

  // extend dayjs
  // e.g. add dayjs.utc()
  dayjsFactory.utc = arguments => {}

  // overriding existing API
  // e.g. extend dayjs().format()
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function(arguments) {
    // original format result
    const result = oldFormat.bind(this)(arguments)
    // return modified result
  }
}
```

## 附录

UTC：协调世界时，又称世界统一时间、世界标准时间、国际协调时间。协调世界时是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。国际原子时的准确度为每日数纳秒，而世界时的准确度为每日数毫秒，为时间系统接近世界时UT，确保协调世界时与世界时相差不会超过0.9秒，在有需要的情况下会在协调世界时内加上正或负闰秒，一种称为协调世界时的折中时标于1972年面世。从1972年1月1日起UTC与UT1（在UT中加入极移改正得到）之间的差值最大可以达到±0.9s，位于巴黎的国际地球自转事务中央局负责决定何时加入闰秒。一般会在每年的6月30日、12月31日的最后一秒进行调整。

网络时间协议就是协调世界时在互联网中使用的一种方式，在军事中，协调世界时区会使用“Z”来表示。又由于Z在无线电联络中使用“Zulu”作代称，协调世界时也会被称为"Zulu time"，中国大陆、中国香港、中国澳门、中国台湾、蒙古国、新加坡、马来西亚、菲律宾、西澳大利亚州的时间与UTC的时差均为+8，也就是UTC+8。

GMT: 格林尼治标准时间，根据地球的自转和公转来计算时间，而地球每天的自转是有些不规则的，而且正在缓慢减速，所以不再作为标准时间使用。在不需要精确到秒的情况下，通常将GMT 和UTC 视作等同，GMT=UTC+0

