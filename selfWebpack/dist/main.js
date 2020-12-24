
    (function(modules) {
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
      return __webpack_require__('./src/index.js');
    })({
      './src/index.js': function(module, exports, require){
        "use strict";

var _data = _interopRequireDefault(require("./src/data.js"));

var _random = _interopRequireDefault(require("./src/random.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('🐻我是数据文件--->', _data["default"]);
console.log('🦁我是随机数--->', _random["default"]);
console.log('🐺我是index.js');
      },'./src/data.js': function(module, exports, require){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var result = '我是文件里面的数据';
var _default = result;
exports["default"] = _default;
      },'./src/random.js': function(module, exports, require){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var random = Math.random();
var _default = random;
exports["default"] = _default;
      },
    })
    