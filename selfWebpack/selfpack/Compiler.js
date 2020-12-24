const { SyncHook } = require('tapable')
const Compilation = require('./Compilation')

class Compiler {
  constructor(options) {
    this.modules = []
    this.options = options
    this.hooks = {
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }
  }
  run() {
    const onComplete = (err, compilation) => { }
    this.compile(onComplete)
  }
  compile(callback) {
    const compilation = new Compilation(this)
    // 触发钩子执行
    this.hooks.run.call()
     //通过entry找入口文件
    const entryModule = compilation.buildModule(this.options.entry, true)
    this.modules.push(entryModule)
    this.modules.map((_module) => {
      const deps = _module.dependecies
      for (const key in deps){
        if (deps.hasOwnProperty(key)){
          this.modules.push(compilation.buildModule(deps[key], false))
        }
      }
    })
    // console.log('最终的 modules', this.modules)
    // compilation.emitFiles()
    this.hooks.emit.call()
    this.hooks.done.call()

  }
}
module.exports = Compiler