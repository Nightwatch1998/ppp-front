const path = require('path')
// __dirname指向当前脚本所在的目录路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave:false,
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        '@': resolve('src'),
      },
    },
  },
//   devServer:{
//       open:true,
//       host:'localhost',
//       port:8080,
//       https:false,
//       proxy:{
//           '/v3':{
//               target:'https://api.seniverse.com/v3',
//               changeOrigin: true,
//               pathRewrite:{
//                   '^/v3':''
//               }
//           }
//       }
//   }
}