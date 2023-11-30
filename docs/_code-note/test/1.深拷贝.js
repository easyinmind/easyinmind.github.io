// 判断是否是值类型
// 值类型直接返回
// 引用类型判断数组对象
// 遍历递归赋值给新的对象
// Map判断循环引用
const deepClone = (obj, map = new Map()) => {
  if(typeof obj !== "object" || obj === null) {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  if(map.get(obj[k])) {
    return map.get(obj[k])
  }
  map.set(obj[k], result)
  
  for(let k in obj) {
    if(obj.hasOwnProtyte(obj[k])) {
      result[k] = deepClone(obj[k])
    }
  }
  return result
}