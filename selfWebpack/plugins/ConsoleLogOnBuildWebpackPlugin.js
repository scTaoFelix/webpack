const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('The webpack build process is starting!!!');
    });
    // 在文件打包结束后执行
    compiler.hooks.done.tap(pluginName,(compilation)=> {
      console.log("整个webpack打包结束")
    })
    // 在webpack输出文件的时候执行
    compiler.hooks.emit.tap(pluginName,(compilation)=> {
        console.log("开始生成文件啦！！")
    })
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;