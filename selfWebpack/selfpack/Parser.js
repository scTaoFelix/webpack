const traverse  = require('@babel/traverse').default
const fs = require('fs')
const { transformFromAst} = require('@babel/core')
const parser = require('@babel/parser')
const path = require('path')

class Parser{
  static ast(path){
    const content = fs.readFileSync(path, 'utf-8') // 读取文件
    const _ast = parser.parse(content, {
      sourceType: 'module' //表示我们要解析的是ES模块
    })
    // console.log(_ast)
    // console.log('我是body内容', _ast.program.body)
    return _ast
  }
  static getDependecy(ast, file) {
    const dependecies = {}
    // 转成ast 要遍历这个树  babel-traverse
    // 遍历之后 在ast里面找到节点类型
    // ImportDeclaration 描述
    traverse(ast, {
      ImportDeclaration: ({node}) => {
        const oldValue = node.source.value
        const dirname = path.dirname(file)
        const relativepath = "./" + path.join(dirname, oldValue) 
        dependecies[oldValue] = relativepath
        node.source.value = relativepath // 将 ./data.js 转化成 ./src/data.js
      }
    })

    // console.log('依赖文件', ast.program.body)
    return dependecies
  }
  static transform(ast) {
    const {code} = transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return code
  }
}
module.exports = Parser