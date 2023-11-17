let T = 'k1=v1&k2=v2&k1=v2'
function mergeVal(res, key, val = true) {
  // 已存在key
  if (Object.keys(res).includes(key))
    res[key] = Array.isArray(res[key]) ? [...res[key], val] : [res[key], val]
  else
    res[key] = val

  return res
}
function merge(res, str) {
  let reg = /([^&]*)=(.*)/g
  // 有等号
  if (reg.test(str)) {
    let L = str.replace(reg, '$1')
    let R = str.replace(reg, '$2')

    res = mergeVal(res, L, R)
  }
  else {
    // 没等号
    res = merge(res, str)
  }
  return res
}
function dfs(str, res = {}) {
  if (str === '')
    return res

  let reg = /([^&]*)&(.*)/g
  if (reg.test(str)) {
    let L = str.replace(reg, '$1')
    let R = str.replace(reg, '$2')
    dfs(R, merge(res, L))
  }
  else {
    dfs('', merge(res, str))
  }
  return res
}
dfs(T)