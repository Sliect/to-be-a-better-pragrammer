// 1. 状态流转
// 2. 监听状态流转的回调触发
// 3. 如果onFulfilled/onRejected 抛出异常，p2拒绝执行
// 4. resolvePromise promise/类promise对象/其他

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MPromise {
  FULFILLED_CALLBACK_LIST = []
  REJECTED_CALLBACK_LIST = []
  _status = PENDING

  constructor(fn) {
    this._status = PENDING
    this.value = null
    this.reason = null

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  get status() {
    return this._status
  }

  set status(newStatus) {
    this._status = newStatus

    if (newStatus === FULFILLED) {
      this.FULFILLED_CALLBACK_LIST.forEach(cb => {
        cb(this.value)
      })
    } else if (newStatus === REJECTED) {
      this.REJECTED_CALLBACK_LIST.forEach(cb => {
        cb(this.reason)
      })
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value
      this.status = FULFILLED
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : val => val
    const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => {
      throw reason
    }

    const p2 = new MPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      switch (this.status) {
        case FULFILLED: {
          fulfilledMicrotask()
          break;
        }
        case REJECTED: {
          rejectedMicrotask()
          break;
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask)
          break;
        }
      }
    })

    return p2
  }

  resolvePromise(p2, x, resolve, reject) {
    if (p2 === x) {
      return reject(new TypeError('死循环'))
    }

    if (x instanceof MPromise) {
      queueMicrotask(() => {
        x.then(y => {
          this.resolvePromise(p2, y, resolve, reject)
        }, r => {
          reject(r)
        })
      })
    } else if (typeof x === 'object' || this.isFunction(x)) {
      if (x === null) {
        return resolve(x)
      }

      let then = null
      try {
        // 防止类似defineProperty 的API 报错
        then = x.then
      } catch (error) {
        reject(error)
      }

      if (this.isFunction(then)) {
        let called = false
        try {
          then.call(x, y => {
            if (called) return
            called = true
            this.resolvePromise(p2, y, resolve, reject)
          }, r => {
            if (called) return
            called = true
            reject(r)
          })
        } catch (error) {
          if (called) return 
          reject(error)
        }
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then(value => {
      return MPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MPromise.resolve(callback()).then(() => { throw reason })
    })
  }

  static resolve(value) {
    if (value instanceof MPromise) return value
    return new MPromise(resolve => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(arr) {
    return new MPromise((resolve, reject) => {
      let res = []
      let count = 0

      for (let i = 0; i < arr.length; i++) {
        MPromise.resolve(arr[i])
          .then(value => {
            res[i] = value
            count++

            if (count === arr.length) {
              resolve(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
 
  static race(promiseList) {
    return new MPromise((resolve, reject) => {
      const len = promiseList.length

      if (len === 0) {
        resolve()
      } else {
        for (let i = 0; i < len; i++) {
          MPromise.resolve(promiseList[i])
            .then(val => {
              return resolve(val)
            }, r => {
              return reject(r)
            })
        }
      }
    })
  }

  isFunction(param) {
    return typeof param === 'function'
  }
}


// const test = new MPromise((resolve, reject) => {
//   setTimeout(() => {
//       reject(111);
//   }, 1000);
// }).catch((reason) => {
//   console.log('报错' + reason);
//   console.log(test)
// });

// setTimeout(() => {
//   console.log(test);
// }, 3000)












































MPromise.defer = MPromise.deferred = function(){
  let dfd = {};
  dfd.promise = new MPromise((resolve, reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}
module.exports = MPromise