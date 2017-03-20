# 输入框输入文本自动形成小框方便删除插件 mailbox.js v1.1

## 简介

基于jquery1.7+实现,实现类似网易邮箱写信地址栏动态功能



### 默认属性

```javascript
    var defaults = {
            'container' : '#wrap',//容器id;
            'width':'400px',//设置容器宽度
            'height':'30px',//设置容器高度
            'background':'transparent',//背景色
            'line-height':'30px',
            //已输入内容tip小框样式和input输入框样式
            'validation':function(str){
                var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                return reg.test(str);
            },
            'style':{
                'height':'12px',//设置div.tip高度
                //'background':'#fff',//div.tip背景色
                'font-size':'12px',
                'line-height':'12px',
                'input_width':'100px',//输入框默认宽度     
            },
            'info':'输入提示信息'

    };
```

## 使用

### 引入

```html
<link rel="stylesheet" type="text/css" href="css/mailbox.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="js/mailbox.js" type="text/javascript" charset="utf-8" ></script>
```
    
### 添加容器

```html
<div id="wrap">

</div>       
```

### 初始化

```javascript
        var m=new Mailbox({
            'container' : '#wrap',//容器id;
            'width':'600px',//设置容器宽度
            'height':'30px',//设置容器高度
            'style':{       //div.tip已输入内容框样式
            }
        });
```
### 获取输入框value

```javascript
m.getValue()
```