let MyPlugin = function (options) {
  this.test = options.test
}
MyPlugin.prototype.apply = function (compiler) {
  // 插件运行即调用
  // console.log('我们的插件被执行了')
  // console.log(this.test)
  // console.log(compiler)
  // compiler.options获取webpack配置文件的属性
  // 先指定自己怎么编译，根据别人的编译结果操作（在编译过程中做什么）
  compiler.plugin('compilation', compilation => {
    // 别人编译的入口（html-webpack-plugin提供的接入点）
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, callback) => {
      console.log(htmlData.html)
      // html-webpack-plugin中间插入行为的地方
      // htmlData.html = htmlData.html.replace(`<div id="app"></div>`)
      htmlData.html = htmlData.html.replace(`<div id="app"></div>`, `<div id="app">
            <div style="background-color: hotpink;height: 500px;">
                骨架屏
            </div> 
    </div>`)
      // 更改了其中的html，未来生成的html就是以上内容
      callback(null, htmlData)
    })
  })
}
// 向外导出插件
module.exports = MyPlugin
