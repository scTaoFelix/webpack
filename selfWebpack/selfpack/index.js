const Compiler = require('./Compiler')
const options = require('../selfpack.config.js')
const compiler = new Compiler(options)
const plugins = options.plugins
for (let plugin of plugins) {
    plugin.apply(compiler)
}
compiler.run()