const cloneDeep = (obj) => {
  if(typeof obj !== 'object') {
    const cloneObj = Array.isArray(obj) ? [] : {}
    for(let k in obj) {
      // cloneObj[]
    }
  } else {
    return obj
  }
}