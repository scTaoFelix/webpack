// import data from './sync.js'
// console.log(data)
import("./sync.js").then( (_) => {
  console.log(_)
})
import("./async.js").then( (_) => {
  console.log(_)
})
console.log("我是 webpack 5")



import { output } from './demo.js'
console.log(output + "  🐱")