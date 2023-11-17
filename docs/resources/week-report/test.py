def fib(n):
  if (n == 1 or n == 2):
     return 1
  prev = 1
  curr = 1
  
  for i in range(n-2):
    tmp = prev + curr
    prev = curr
    curr = tmp
  
  return curr

print(fib(3), fib(4), fib(5))