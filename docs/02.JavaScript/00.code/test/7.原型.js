// 寄生组合继承
function P() {
}
function S() {
  // this是返回的新对象
  P.apply(this)
}
S.prototype = Object.create(P.prototype)
S.prototype.constrcutor = S


// class继承
// 关键点在于extends继承的父类
// super的调用相当于P.call(this)

// 关于class
// constructor 里面的代码相当于函数内的代码
// 在constructor，调用 super 相当于P.call(this)
// class里定义的方法则为P.prototype上的方法
// class里 static 定义的方法则为P上定义的方法

class X extends P {
  constructor(value) {
    // 这里相当于构造函数体
    // 如果使用了extends继承别的类，
    // 调用这个方法可以继承类自身的属性，P.apply(this, value)
    super(value)
  }
  // 这里相当于在原型上定义的方法
  a(){}
  // static是定义在类自身的静态方法，不会被子类继承
  static b() {}
}


// 关于模块化
// 变量污染，文件依赖等问题、动态导入，运行在代码执行阶段
// commonjs 的实现
// module 基本实现， module 是 Node 独有的一个变量
var module = {
  id: 'xxxx', // 我总得知道怎么去找到他吧
  exports: {} // exports 就是个空对象
}
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports
// exports和module.exports指向的是同一块内存
// 如果使用这样的语法 exports = {a: 1}，会改写exports的指向，
// 修改并不会对 module.exports 起效,即a无效，module.exports下的属性有效
// 正确导出
// exports.name = 1
// module.exports.age = 24
// module.exports = {}

// 导入 require()
// 导入的是 module.exports
// 不会重复导入，第二个require无效


// Es Module
// 引用导出，只读，静态，运行在代码编译阶段


// commonjs ESM 区别
// commonjs：动态、代码执行阶段、值拷贝、混合导入、this为当前模块
// ESM：静态、代码编译阶段、引用拷贝、混合导入、只读、this为undefined
