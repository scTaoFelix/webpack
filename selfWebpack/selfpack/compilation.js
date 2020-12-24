const path = require('path')
const Parser = require('./Parser')
const fs = require('fs')

class Compilation {
  constructor(compiler) {
    const { options, modules } = compiler
    this.options = options
    this.root = process.cwd() // 执行命令的当前目录
    this.entryId
    this.modules = modules
  }
  buildModule(absolutePath, isEntry) {
    let ast = ''
    ast = Parser.ast(absolutePath)
    const relativePath = './' + path.relative(this.root, absolutePath)
    if(isEntry){
      this.entryId = relativePath
    }
    const dependecies = Parser.getDependecy(ast, relativePath)
    const transformCode = Parser.transform(ast)
    // console.log("依赖项", dependecies)
    // console.log("转换后的代码 ", transformCode)
    return {
      relativePath,
      dependecies,
      transformCode 
    }
  }
  emitFiles(){
    // 写一个模版类
    let _modules = ''
    const outputPath = path.join(
      this.options.output.path,
      this.options.output.filename
    )
    this.modules.map((_module) => {
      // 记得加引号
      _modules += `'${_module.relativePath}': function(module, exports, require){
        ${_module.transformCode}
      },`
    })
    const template = `(function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        // Check if module is in cache
        if(installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
          exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
      }
      // 执行的入口函数
      return __webpack_require__('${this.entryId}');
    })({
      ${_modules}
    })
    `
    const dist = path.dirname(outputPath)
    fs.mkdirSync(dist)
    fs.writeFileSync(outputPath, template, 'utf-8')
  }
}
module.exports = Compilation