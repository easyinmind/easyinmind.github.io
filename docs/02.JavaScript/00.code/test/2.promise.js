// 三种状态不可逆
// Promise() 返回一个Promise实例
// then catch 最终返回一个Promise实例
// then catch 回调如果报错状态会为rejected
// then catch 回调返回的值如果不是promise实例，使用Promise.resolved包装成promise实例
// then catch 回调如果返回promise实例，状态继承这个实例
// then catch 回调如果返回当前promise实例，报错
// then catch 回调需要异步调用（微任务=》使用settimeout模拟）
// thenable 对象，具有then属性，类似Promise的东西，如 jQuery.ajax的返回值，
// 但是有then方法的对象并不一定作为 Promise对象使用

const PENDING = "pending";
const REJECTED = "rejected";
const RESOLVED = "resolved";

function myPromise(fn) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.resolveCallbacks = [];
  this.rejectCallbacks = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = RESOLVED;
      this.value = value;
      this.resolveCallbacks.forEach((cb) => cb(value));
    }
  };
  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.resolveCallbacks.forEach((cb) => cb(reason));
    }
  };

  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

myPromise.prototype.then = function(onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
  onResolved =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  if (this.state === PENDING) {
    // 返回一个promise实例
    const p2 = new myPromise((resolve, reject) => {
      // pending状态，将回调放进队列
      // 等待将来resolve或者reject依次调用
      this.resolveCallbacks.push(() => {
        // 异步执行
        setTimeout(() => {
          try {
            // 回调返回值
            const r = onResolved(this.value);
            // 决定返回promise实例的状态
            resolvePromise(p2, r, resolve, reject);
          } catch (err) {
            // 执行回调报错  直接reject
            reject(err);
          }
        });
      });
      this.rejectCallbacks.push(() => {
        // 异步执行
        setTimeout(() => {
          try {
            // 回调返回值
            const r = onRejected(this.reason);
            // 决定返回promise实例的状态
            resolvePromise(p2, r, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      });
    });
    return p2;
  }

  if ((this.state = RESOLVED)) {
    // 返回一个promise实例
    const p2 = new myPromise((resolve, reject) => {
      // 异步执行
      setTimeout(() => {
        try {
          // 回调返回值
          const r = onResolved(this.value);
          // 决定返回promise实例的状态
          resolvePromise(p2, r, resolve, reject);
        } catch (err) {
          // 执行回调报错  直接reject
          reject(err);
        }
      });
    });
    return p2;
  }

  if ((this.state = REJECTED)) {
    // 返回一个promise实例
    const p2 = new myPromise((resolve, reject) => {
      // 异步执行
      setTimeout(() => {
        try {
          // 回调返回值
          const r = onRejected(this.reason);
          // 决定返回promise实例的状态
          resolvePromise(p2, r, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    });
    return p2;
  }
};

function resolvePromise(promise, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }

  if (x instanceof MyPromise) {
    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
    // 这个if跟下面判断then然后拿到执行其实重复了，可有可无
    x.then(function(y) {
      resolvePromise(promise, y, resolve, reject);
    }, reject);
  }

  // 如果 x 为对象或者函数
  else if (typeof x === "object" || typeof x === "function") {
    // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
    if (x === null) {
      return resolve(x);
    }

    // 把 x.then 赋值给 then
    let then;
    try {
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === "function") {
      var called = false;
      // 将 x 作为函数的作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      // 名字重名了，我直接用匿名函数了
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          function(y) {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          function(r) {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return;

        // 否则以 e 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 回调返回值x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
