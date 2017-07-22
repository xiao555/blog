## Webjucks

各种聚会各种吃，拖了好几天...今天来更新一下...

今天增加了数据模块，实现了数据模板分离的功能，这样算是可以方便的使用了，后面会进一步完善数据和模板，添加一些自定义函数等等，欢迎star以及提issue :-D

### 项目结构

```bash
- web
  - build                    # 打包生成的
  - src           
    - assets                 # 其他资源
      - images             
      - fonts 
    - posts
      - *.html               # 数据
    - scripts
      - index.js             # 入口文件 
    - styles
      - styles               #css
      - stylus
        - *.styl         
        - variables.styl     # 全局变量  
      - index.js               # 入口文件
  - views 
    - base.html              # 模板
    - includes               # 引用的模块
      - header.html
      - footer.html  
  - webpack.config.js        # webpack配置文件
```

### 使用

那怎么来用 webjucks 来搭建自己的前端项目呢?

#### HTML 和 数据

从项目结构里能够看到，视图或者模板放在 `views` 目录下，同时在 `src/posts`目录下相应的创建html文件存放数据，内容如下：

```html
---
layout: index.html
title: index
---
content
``` 
在模板里使用如下：

```html
{{ title }}   // index
{{ content }} // content
```
现在数据部分可以用md语法写，字段前面要加上`!!md`：
```html
---
link: !!md [link](www.example.com)
---
``` 
渲染后：

```html
<p><a href="www.example.com">link</a></p>
```


在html里img标签用到的图片会复制到build目录下：

```
// html
<img src="assets/images/bg.jpg">

- root
  - src/assets/images/bg.jpg  
```  
after loader:
```
- root
  - build/assets/images/bg.jpg 
  - src/assets/images/bg.jpg 
```

我们采用的模板引擎是 [Nunjucks](https://mozilla.github.io/nunjucks/) ,后面会加上一些高级应用。

#### CSS 和 JS

数据模板好了，再来看看 `css` 和 `js` 怎么添加。从项目结构里也可以发现 `css` 和 `js` 都是放在 `src/styles` 和 `src/scripts` 里，而且这两个文件夹都有一个叫 `index.js` 的入口文件，用过 `webpack` 的童鞋就明白了，这个入口文件就是告诉 `webpack` 需要打包那些文件的。

比如你要添加css和stylus文件：

```js
// src/styles/index.js
import './styles/style.css';
import './stylus/common.styl';
```
这样 Webpack 在打包的时候就会把这两个文件打包进去，另外 `src/styles/stylus/` 目录下有个 `variables.styl` 文件，这个文件是保存一些全局变量的，比如项目里需要用到的颜色，字体，排版，媒体查询，自定义函数等等，不用写进入口文件，在 Webpack 的配置文件里已经写进去了。另外配置文件还定义了一些`alias`，比如 `assets` 就代表 `src/assets` 目录，`assets` 目录用来放 images，fonts 等等静态资源，假如我们需要引用某个图片或者某个字体文件：

```js
// stylus
background url('assets/images/img.jpg')

// index.js
import 'assets/fonts/xxxx.css';
```
如果需要引用 `node_modules` 里的某个 package 的内容：

```js
// src/scripts/index.js
import 'copy!jquery/dist/jquery.min.js'
import $ from 'jquery'
import 'jquery-validation/dist/jquery.validate.js' // 导入 jquery-validation
```
解释一下前两行，`copy！` 是在配置文件中写好的，后面的js文件复制到 `build/assets` 里。
`jquery` 也是写在配置文件中的。

另外，引入了 [nib](https://github.com/tj/nib) 以及 [autoprefixer](https://github.com/postcss/autoprefixer), nib 的函数可以直接在styl里引用，例如 `common.styl` 里

```css
global-reset()
normalize-css()
``` 
autoprefixer 可以自动给css属性添加前缀。

#### 打包测试

```javascript
npm install
npm start
```
 会自动转到浏览器浏览 `http://localhost:4000/` , 采用[Browsersync](http://www.browsersync.cn/) 热加载的，修改html, js，css会自动刷新。

