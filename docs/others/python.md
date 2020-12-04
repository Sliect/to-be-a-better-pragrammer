# python

面向对象三步走

1. 定义类

2. 创建对象

3. 给对象发消息

is-a 继承 has-a 关联 use-a 依赖

限定对象只能绑定\_name, \_age 和\_gender 属性  
**slots** = ('\_name', '\_age', '\_gender')

python 查找一个变量按局部作用域，嵌套作用域，全局作用域，内置作用域的顺序进行查找

列表和元组的区别：元组不能增删改元素，元组在创建时间和占用空间上都优于列表

**str** 自定义实例信息

**add** 自定义 + 操作符

在程序中创建进程的时候，子进程复制了父进程及其所有的数据结构，每个子进程有自己独立的内存空间，全局变量也会复制，应当使用 multiprocessing 模块中的 Queue 类，它是可以被多个进程共享的队列

多线程开发推荐 threading 模块的 Thread 类创建线程，且可以通过继承 Thread 类创建任务对象，自定义 run 方法并启动线程，通过 threading 模块的 Lock 保护临界资源，防止获得错误结果，保证结果正确

```python
from time import sleep
from threading import Thread, Lock


class Account(object):

    def __init__(self):
        self._balance = 0
        self._lock = Lock()

    def deposit(self, money):
        # 先获取锁才能执行后续的代码
        self._lock.acquire()
        try:
            new_balance = self._balance + money
            sleep(0.01)
            self._balance = new_balance
        finally:
            # 在finally中执行释放锁的操作保证正常异常锁都能释放
            self._lock.release()

    @property
    def balance(self):
        return self._balance


class AddMoneyThread(Thread):

    def __init__(self, account, money):
        super().__init__()
        self._account = account
        self._money = money

    def run(self):
        self._account.deposit(self._money)


def main():
    account = Account()
    threads = []
    for _ in range(100):
        t = AddMoneyThread(account, 1)
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
    print('账户余额为: ￥%d元' % account.balance)


if __name__ == '__main__':
    main()
```

## 模块

图片处理： PIL

多线程： threading

堆排序，从列表中找出最大的或最小的N个元素： heapq

迭代工具： itertools

剪切板： pyperclip

复制、移动、删除、改名文件： shutil

启动浏览器： webbrowser

解析html： BeautifulSoup  (import bs4)

collection  
- namedtuple：命令元组，它是一个类工厂，接受类型的名称和属性列表来创建一个类。  
- deque：双端队列，是列表的替代实现。Python中的列表底层是基于数组来实现的，而deque底层是双向链表，因此当你需要在头尾添加和删除元素是，deque会表现出更好的性能，渐近时间复杂度为$O(1)$。  
- Counter：dict的子类，键是元素，值是元素的计数，它的most_common()方法可以帮助我们获取出现频率最高的元素。Counter和dict的继承关系我认为是值得商榷的，按照CARP原则，Counter跟dict的关系应该设计为关联关系更为合理。  
- OrderedDict：dict的子类，它记录了键值对插入的顺序，看起来既有字典的行为，也有链表的行为。
- defaultdict：类似于字典类型，但是可以通过默认的工厂函数来获得键对应的默认值，相比字典中的setdefault()方法，这种做法更加高效。