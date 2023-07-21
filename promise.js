const promisify = (fn) => (...args) => {
    return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
            err ? reject(err) : resolve(result);
        })
    })
}

const fetchProduct = (speed) => (value, callback) => {
    return setTimeout(() => callback(null, value),speed)
}
const fast = fetchProduct(10)
  const promise = promisify(fast);

  promise(20).then((data) => {
    console.log(data, 'somedata')
  }).catch((err) => {
    console.log(err, 'an error')
  })