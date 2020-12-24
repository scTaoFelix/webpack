import(/* webpackChunkName: "sync" */ "./sync.js").then( (_) => {
  console.log(_)
})
import(/* webpackChunkName: "async" */ "./async.js").then( (_) => {
  console.log(_)
})
console.log("我是 webpack 4")
