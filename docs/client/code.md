# 激活码

## 前端校验
```js
function restoreUUID(uuidStr) {
  if (uuidStr.length !== 32)
    throw new Error('Invalid UUID length')
  if (!/^[0-9a-f]{32}$/i.test(uuidStr))
    throw new Error('Invalid UUID characters')

  return `${uuidStr.slice(0, 8)}-${uuidStr.slice(8, 12)}-${uuidStr.slice(12, 16)}-${uuidStr.slice(16, 20)}-${uuidStr.slice(20)}`
}

// 测试
const shortUUID = '123e4567e89b12d3a456426614174000'
console.log(restoreUUID(shortUUID)) // 输出：123e4567-e89b-12d3-a456-426614174000
```
