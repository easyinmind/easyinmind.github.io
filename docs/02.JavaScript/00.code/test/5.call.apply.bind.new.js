// new
// 1. 创建一个对象
// 2. 改变对象的原型
// 3. 执行构造函数
// 4. 返回对象
function myNew() {
  const constructor = [].shift.call(arguments);
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

// Object.create
// 返回一个新的对象，原型指向传入的对象
// 创建一个构造函数，改变构造函数的原型，返回构造函数的实例
function myCreate(obj) {
  function Fn(){}
  Fn.prototype = obj
  return new Fn()

  // const o = {}
  // o.__proto__ = obj
  // return o
}

// call/apply 改变函数内的this指向
// 判断是否是函数调用
// 判断传的值是否是空
// 把调用函数的值赋给传入对象的属性，通过对象调用
// 传入额外参数方法调用，删除新增的属性
// 返回运行结果
Function.prototype.myCall = function(content) {
  if(typeof content !== "function") {
    throw new Error("err info")
  }
  // 不传值，是window
  content = content || window
  // this是调用的函数，把调用的函数赋值给传入的对象属性
  // fn 是新增的属性
  content.fn = this
  // 额外参数
  const args = [...arguments].slice(1)
  // content调用，fn的this指向content
  const result = content.fn(...args)
  delete content.fn
  return result
}

Function.prototype.myApply = function(content) {
  if(typeof content !== 'function') {
    throw new Error("err info")
  }
  content = content || window
  content.fn = this
  const args = [...arguments].slice(1)

  let result
  if(args) {
    result = content.fn(args)
  }else {
    result = content.fn()
  }

  delete content.fn
  return result
}
// 需要考虑 new 调用
Function.prototype.bind = function(content) {
  if(typeof content !== "function") {
    throw new Error()
  }
  content = content || window
  const _this = this
  const args = [...arguments].slice(1)

  return function F() {
    // 是否是new调用
    if(this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(content, args.concat(...arguments))
  }
}