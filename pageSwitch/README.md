# 页面切换插件 pageSwitch v1.1

## 简介

基于jquery1.7+实现的全屏滚动插件，可垂直全屏滚动页面

#### Demo地址

https://yemaobumei.github.io/pageSwitch/demo.html

### 默认属性

```javascript
    defaults = {
        'container' : '#container',//容器
        'page' : '.page',//子容器
        'keyboard' : true,//是否支持键盘
    };
```

## 使用

### 引入

```html
<link rel="stylesheet" type="text/css" href="css/scroll.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="js/pageSwitch.min.js" type="text/javascript" charset="utf-8" ></script>
```
    
### 添加容器

```html
<body id="container">
    <div class="page pageOne"></div>
    <div class="page pageTwo"></div>
    <div class="page pageThree"></div>
    <div class="page pageFour"></div>
</body>       
```

### 初始化

```javascript
        $("#container").switchPage({
            'container' : '#container',//容器
            'page' : '.page',//子容器
            'keyboard' : true,
        });
```
