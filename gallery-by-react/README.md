webpack后生成的dist/index.html想要能访问到图片必须修改cfg/default.js publicPath 为 assets/,

上传到gitpages想要访问也是如此

在本地npm start测试时候要改回/assets/，否则图片无法显示