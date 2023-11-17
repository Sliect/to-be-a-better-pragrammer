// 冒泡排序
function bubleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// 选择排序
function selectSort(arr) {
  let minIndex
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}

// 插入排序
function insertSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j + 1] >= arr[j]) {
        break
      } else {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// 归并排序
// 分治思想:拆分成小问题解决,合并
function mergeSort(arr) {
  const len = arr.length
  if (len <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const leftArr = mergeSort(arr.slice(0, mid))
  const rightArr = mergeSort(arr.slice(mid, len))
  arr = mergeArr(leftArr, rightArr)
  return arr
}

function mergeArr(arr1, arr2) {
  let i = 0;
  let j = 0
  let res = []
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  if (i < arr1.length) {
    res = res.concat(arr1.slice(i))
  }
  if (j < arr2.length) {
    res = res.concat(arr2.slice(j))
  }
  return res
}

// 快速排序
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) { // 长度大于2
    const pivot = getPivot(arr, low, high)
    if (pivot - 1 > low) {
      quickSort(arr, low, pivot - 1)
    }
    if (pivot < high) {
      quickSort(arr, pivot, high)
    }
  }
  return arr
}
// 保证基准值两侧的相对位置 返回新基准
function getPivot(arr, low, high) {
  let pivotValue = arr[low]
  let i = low
  let j = high
  while (i < j) {
    // 定位左侧大于等于基准的位置
    while (arr[i] < pivotValue) {
      i++
    }
    // 定位右侧小于等于基准的位置
    while (arr[j] > pivotValue) {
      j--
    }
    // 交换
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}

// 计数排序 稳定排序
// 适用于最小和最大差值不大，且元素都是整数
// 0. 计算最大值和最小值的差值
// 1. 生成不大于元素的计数数组 如[2,0,1] => [2,2,3]
// 2. 从后往前遍历元素放入排好序的新数组
// 3. 返回数组
function countSort(arr) {
  // 计算极值
  let max = arr[0]
  let min = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i]
    if (min > arr[i]) min = arr[i]
  }
  let d = max - min
  // 统计计数数组 并统计对应元素个数
  let countArray = (new Array(d + 1)).fill(0)
  for (let i = 0; i < arr.length; i++) {
    countArray[arr[i]-min]++
  }
  // 数组变形
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i-1]
  }
  // 
  let sortedArray = new Array(arr.length)
  for (let i = arr.length - 1; i >= 0; i--) {
    sortedArray[countArray[arr[i] - min] - 1] = arr[i]
    countArray[arr[i] - min]--
  }

  return sortedArray
}