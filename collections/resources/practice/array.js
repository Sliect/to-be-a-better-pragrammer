// 两数求和
// 示例：nums = [2, 7, 11, 15], target = 9
// 返回：[0, 1]
// 首先暴力解法
function twoSum(nums, target) {
  // O(n^2)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return false
}
// 空间换时间
function twoSum(nums, target) {
  // 键：需匹配的值 值：下标
  let cache = {}
  for (let i = 0; i < nums.length; i++) {
    if (cache[nums[i]] !== undefined) {
      return [cache[nums[i]], i]
    } else {
      cache[target - nums[i]] = i
    } 
  }
} 

/**
 * 示例: 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6], n = 3
 * 输出: [1,2,2,3,5,6]
 */
// 双指针法
// 直到两边的指针全部到-1为止
function merge(nums1, nums2) {
  let j = nums1.length - 1
  let k = nums2.length - 1
  let end = nums1.length + nums2.length - 1
  for (let i = end; i >= 0; i--) {
    if (nums1[j] > nums2[k]) {
      nums1[i] = nums1[j]
      j--
    } else {
      nums1[i] = nums2[k]
      k--
    }
    if (j === -1 || k === -1) {
      break
    }
  }
  // 处理nums2中未赋值的数组
  for (; k >= 0; k--) {
    nums1[k] = nums2[k]
  }
  return nums1
}

// 三数求和
// 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
function threeSum(nums) {
  let res = []
  // 排序后 固定一个 双指针移动 去除重复
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue
    let j = i + 1
    let k = nums.length - 1

    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k]
      if (sum > 0) {
        k--
      } else if (sum < 0) {
        i++
      } else {
        res.push([nums[i], nums[j], nums[k]])
        while (j < k && nums[j] === nums[j+1]) j++ 
        while (j < k && nums[k] === nums[k-1]) k--
        j++
        k--
      }
    }
  }
  return res
}
