
import xlwings as xw
import time

"""
a列为起始点
b列为终点
c,d,e,f,g为之前的五列
h,i为折扣列
"""
start = time.time()

# 引号里面是路径位置
wb = xw.Book(r'C:\Users\dell\Downloads\test.xlsx')

# 引号里是sheet名字
sheet = wb.sheets['大零担指标']
valSht = wb.sheets['大零担折扣']


def createDict(sht):
    # 字典
    dictionary = {}
    shape = sht.used_range.shape
    # 最大行数
    rows = shape[0] - 1
    # 数据源
    source = sht.range('A2:F' + str(rows)).value
    for row in range(rows):
        arr = source[row-1]
        # b,c列作为键
        key = arr[1] + arr[2]
        # d列作为值
        dictionary[key] = arr[3]
    return dictionary


# 使用到的形状区域
shape = sheet.used_range.shape
# 最大行数
rows = shape[0]

# 左上角索引
pos = 'a1'
# 数据源
source = sheet.range('A1:G' + str(rows)).value

# 转换的数组
target = []

# 转换的列序号
col = 3

# 折扣字典
d = createDict(valSht)
# 循环赋值转换
for row in range(rows):
    if (row == 0):
        target.append(source[0].copy())
        continue
    # 源数据的行数组
    arr = source[row]

    # 目标的新数组
    newArr = arr.copy()
    newArr[col] = None
    if (arr[col] is not None):
        # 转换后的数组
        sArr = arr[col].split('、')
        for sItem in sArr:
            newArr[col] = sItem
            key = newArr[1] + newArr[4]
            # 折扣赋值
            newArr[5] = d[key] if (d.get(key)) else None
            target.append(newArr.copy())
            newArr[col] = None

    # 为空和复制第一列
    newArr[col] = arr[col-1]
    key = newArr[1] + newArr[4]
    # 折扣赋值
    newArr[5] = d[key] if (d.get(key)) else None
    target.append(newArr.copy())

newSht = wb.sheets.add('大零担增量目标值')
newSht.range(pos).value = target

end = time.time()
print('耗时：' + str(end - start) + 's')
