import xlwings as xw
import pandas as pd

wb = xw.Book('demo.xlsx')

sheet = wb.sheets['Sheet2']
df = pd.DataFrame([[1,2], [3,4]], columns=['a', 'b'])

sheet.range('A3').value = [['Foo 1', 'Foo 2', 'Foo 3'], [10.0, 20.0, 30.0]]

print(sheet.range('A3').expand().value)