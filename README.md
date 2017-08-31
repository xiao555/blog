# 新的博客正式上线

这是一个vue的练手项目，也是koa的练手项目。
这是一个js写的完整的博客系统。
这是一个前后端分离 + 服务端渲染的博客系统。
这是一个前端 SPA + 后端 RESTful API 的博客系统。
这是一个为了找实习做的个人作品，虽然是在找完实习后完成的。
这是我以后的试验田，也是个人分享的平台。
当然还有很多不足，今后会逐渐完善。

### 开发环境

* MacOS + iTerm2 + Sublime（前期） + Atom（后期）
* Node v7.7.0 + MongoDB + Redis
* Docker

### 技术栈

##### 后端：

* 服务器 Koa2
* 路由 Koa-Router
* 数据库 MongoDB + Mongoose
* 权限验证 Redis + JWT
* 日志 log4js
* 测试 mocha + chai

##### 前端：

* 单页应用 Vue2
* 状态管理 Vuex
* 前端路由 Vue-Router
* 服务端渲染 Express
* Markdown生成目录 + 渲染 marked + uslug + highlight.js
* 通信库 axios
* 缓存 lru-cache

##### 服务器端：

* 腾讯云 Ubuntu 16.04
* 守护进程 pm2
* 反向代理 Nginx
* ssl证书 acme-tiny自动化脚本
* Docker

##### CDN：

* netlify（免费 + 支持https + 支持 github repo导入）

### Usage

最近除了Nginx，Node.js, MongoDB, Redis三部分都上了Docker，要用docker运行的话需要配好docker环境了, 直接运行

```bash
docker-compose build
docker-compose up
```

访问yourdomain:5050 就可以看到博客前端页面了，再按照下面步骤配置Nginx即可，省去了很多步骤。不过build的时间可能有十几分钟（有docker加速器），所以build的时候可以去喝杯茶，聊聊天~~

不想用docker的话，blog部分在`node/blog`目录下，按照下面步骤一步一步走即可。

#### 安装 Node

推荐使用 [NVM](https://github.com/creationix/nvm) 管理Node版本，我的开发版本是 v7.7.0

#### 安装 MongoDB

* [Ubuntu上安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
* [国内推荐阿里云镜像安装](http://www.linuxdiyf.com/linux/26151.html)
* [Mac上安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

貌似Ubuntu上有些坑，比如用官网的教程安装巨慢，可能被墙了，推荐阿里云镜像，后面写一篇记录一下吧。
朋友说apt-get默认是腾讯的源，速度很快，我没默认装过...
#### 安装 Redis

* [Ubuntu](http://blog.fens.me/linux-redis-install/)
* [Mac](http://blog.csdn.net/pingpangbing0902/article/details/47104545)

还是Homebrew方便啊，网上找的一个教程，应该没问题

#### 安装 pm2

```bash
npm i -g pm2
```
用法: [github](https://github.com/Unitech/pm2#commands-overview)

#### 安装依赖

在`client` 和 `server` 目录下分别运行

```bash
npm i
```
#### 运行服务端

##### 配置

```javascript
// config/index.js
export default {
  admin: { // 管理后台用户名，密码
    name: 'yourname',
    passwd: 'yourpassword'
  },
  mongoDB: 'mongodb://localhost/blog', // mongoDB数据库连接uri
  redis: { // Redis
    host: '127.0.0.1',
    port: 6379
  },
  port: process.env.PORT || 3000, // 服务器运行端口
  authSecret: 'blogAuth', // 验证密钥
  expiresIn: 60 * 60, // JWT token 保存时间 1h
}
```

##### 运行

```bash
npm run start

// pm2
npm run pm
```

##### 说明

* 增加了pm script：`"NODE_ENV=production pm2 start entry.js --name='blogServer'"`, 方便部署
* JWT 的token expiresIn 代表在redis中的存储时间，在有效期内可以通过admin后台进行各种操作，过期了需要重新登录生成token
* API访问时统一加前缀api，比如查看公开文章[https://www.xiao555.com.cn/api/articles?status=Published](https://www.xiao555.com.cn/api/articles?status=Published)
* 生产环境下log输出到`log/cheese.log`，格式如下：
```javascript
[2017-06-09 19:19:50.579] [INFO] Blog - Redis is ready
[2017-06-09 19:19:50.602] [INFO] Blog - Connected to localhost:27017/blog
[2017-06-09 19:19:50.605] [INFO] Blog - Server started on port 3000
[2017-06-09 19:20:22.140] [INFO] Blog - GET /api/ 404 - 7ms
[2017-06-09 19:20:29.507] [INFO] Blog - GET /api/articles、 404 - 2ms
[2017-06-09 19:20:33.603] [INFO] Blog - GET /api/articles/ 200 - 14ms
[2017-06-09 19:23:34.390] [INFO] Blog - POST /api/admin/login 200 - 55ms
```

#### 运行客户端

##### 配置

暂时硬编码上，后面放到数据库，通过admin后台来修改
```javascript
// config/index.js
export default {
  dev: { // dev 环境下相关链接
    api: 'http://localhost:3000/api',
    siteInfo: {
      siteUrl: 'http://localhost:5050/',
      postUrl: 'http://localhost:5050/posts/'
    }
  },
  prod: { // 生产环境下相关链接
    api: 'https://www.xiao555.com.cn/api',
    siteInfo: {
      siteUrl: 'https://www.xiao555.com.cn/',
      postUrl: 'https://www.xiao555.com.cn/posts/'
    }
  },
  links: { // 各种链接
    github: "https://github.com/xiao555",
    facebook: "https://www.facebook.com/profile.php?id=100009127309661",
    email: "mailto: zhangruiwu32@gmail.com",
    weibo: "http://weibo.com/u/5315649743",
    zhihu: "https://www.zhihu.com/people/zhang-rui-wu-50",
    rss: "#"
  },
  headerImg: "https://xiao555.netlify.com/header.jpg", // 头像
  titleTemplate: "%s | Xiao555's Blog", // Vue-meta title 格式
}
```

##### 运行
```bash
// dev
npm run dev

// prod
npm run build && npm run start
// pm
npm run build && npm run pm
```

##### 说明
* 增加了pm script：`"NODE_ENV=production pm2 start server.js --name='blogClient'"`, 方便部署
* dev 模式下，自动打开浏览器，支持热重载，跑在本地`8008`端口
* prod 模式跑在本地`5050`端口
* css预处理器用`stylus`，webpack默认打包`/src/assets/css/variables.styl`, 里面配置一些全局变量
* 加载其他字体文件请参考`variables.styl`里的`font-face('Meta', 'FFMetaPro-Normal', 400)`，字体文件放在`/src/assets/font/`目录
* admin管理后台通过`yoursite.com/admin`访问
* 网站icon放在`public`目录下，通过`server.js`里的`app.use(favicon('./public/header.jpg'))`引入。

#### 配置服务器
##### Nginx
安装时候记得要支持http2的，貌似现在直接安装的已经支持了？
本站的nginx配置：
```
server {
    listen 443 ssl http2 default_server;
    server_name xiao555.com.cn www.xiao555.com.cn;

    ssl on;
    ssl_certificate /root/ssl/chained.pem;
    ssl_certificate_key /root/ssl/domain.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA;
    ssl_session_cache shared:SSL:50m;
    ssl_dhparam /root/ssl/dhparams.pem;
    ssl_prefer_server_ciphers on;

    index index.php index.html;
    location ^~ /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect off;
    }

    location ^~  /.well-known/acme-challenge/ {
        alias /var/www/challenges/;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://localhost:5050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect off;
    }
}

server {
    listen 80;
    server_name www.xiao555.com.cn xiao555.com.cn;

    location ^~ /.well-known/acme-challenge/ {
        alias /var/www/challenges/;
        try_files $uri =404;
    }
}

server {
    listen 80;
    server_name xiao555.com.cn www.xiao555.com.cn;
    index index.php index.html;
    location ^~ / {
        rewrite ^(.*)$  https://$host$request_uri;
    }
}
```

`/usr/local/nginx/conf/nginx.conf`，里其他的配置都删掉了，但是不知道为什么访问80端口不会转发, 无奈只好index.html强制刷新网页，在80端口会访问到的html里加上`<meta http-equiv="refresh" content="0;url=https://www.xiao555.com.cn/">`

#####  获取 Let's Encyrpt 证书
这是一个免费的ssl证书，通过[acme-tiny](https://github.com/diafygi/acme-tiny)脚本自动化获取, 简单说一下步骤：
1. 创建帐号
	首先创建一个目录用来放生成的各种东西，我是在`~/ssl`目录下。创建一个 RSA 私钥用于 Let's Encrypt 识别你的身份：

	```
	openssl genrsa 4096 > account.key
	```
2.  创建 CSR 文件
	生成 CSR（Certificate Signing Request，证书签名请求）文件：

	```
	openssl genrsa 4096 > domain.key
	openssl req -new -sha256 -key domain.key -subj "/CN=yoursite.com" > domain.csr
	```
3. 配置验证服务
	创建建用于存放验证文件的目录：

	```
	mkdir -p /var/www/challenges/
	```
	配置服务器(Nginx为例)：

	```
	#example for nginx
	server {
	    listen 80;
	    server_name yoursite.com www.yoursite.com;

	    location /.well-known/acme-challenge/ {
	        alias /var/www/challenges/;
	        try_files $uri =404;
	    }

	    ...the rest of your config
	}
	```
	也可以看我nginx的配置，主要就是访问`/.well-known/acme-challenge/`的时候能访问到`/var/www/challenges/`目录
4. 获取网站证书
	先下载 acme-tiny 脚本：

	```
	wget https://raw.githubusercontent.com/diafygi/acme-tiny/master/acme_tiny.py
	```

	指定账户私钥、CSR 以及验证目录，执行脚本：

	```
	python acme_tiny.py --account-key ./account.key --csr ./domain.csr --acme-dir /var/www/challenges/ > ./signed.crt
	```

	下载 Let's Encrypt 的中间证书：

	```bash
	wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem > intermediate.pem

  	cat signed.crt intermediate.pem > chained.pem
	```

5. Nginx 配置

	```
	server {
	    listen 443;
	    server_name yoursite.com, www.yoursite.com;

	    ssl on;
	    ssl_certificate /path/to/chained.pem;
	    ssl_certificate_key /path/to/domain.key;
	    ssl_session_timeout 5m;
	    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA;
	    ssl_session_cache shared:SSL:50m;
	    # openssl dhparam -out dhparams.pem 2048
	    ssl_dhparam /path/to/dhparams.pem;
	    ssl_prefer_server_ciphers on;

	    ...the rest of your config
	}

	server {
	    listen 80;
	    server_name yoursite.com, www.yoursite.com;

	    location /.well-known/acme-challenge/ {
	        alias /var/www/challenges/;
	        try_files $uri =404;
	    }

	    ...the rest of your config
	}
	```
	那个dhparams.pem是增强安全性的，用`openssl dhparam -out dhparams.pem 2048`生成就可以
6.  配置脚本自动更新
	Let's Encrypt 签发的证书只有 90 天有效期，所以创建一个脚本自动更新

	```
	# renew_cert.sh
	cd ~/ssl/
	python acme_tiny.py --account-key account.key --csr domain.csr --acme-dir /var/www/challenges/ > signed.crt || exit
	wget -O - https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem > intermediate.pem
	cat signed.crt intermediate.pem > chained.pem
	nginx -s reload
	```
	通过 `chmod a+x renew_cert.sh` 赋予执行权限。
	`crontab -e `加入以下内容：

	```
	0 0 1 * * ~/ssl/renew_cert.sh >/dev/null 2>&1
	```
	这样以后证书每个月都会自动更新

### 更新日志

之前做的时候没有记录，所以说一下大体流程吧。
这个项目是从服务端开始开发的，先是要搭建一个RESTful API的服务器，用Mocha + chai 测试功能。
后端功能实现后，开始搞前端，一开始是用vue-cli搭的脚手架，而且admin跟client是分开相互独立的，先开发的admin，最后是client。
开发过程中对`build`目录下的webpack配置文件修改了很多次，结合`vue-hackernews-2.0`加入了服务端渲染的功能，并去掉了dev开发模式的配置。
随着前端功能的增多也在不断修改后端逻辑，最终形成了beta版本——[github](https://github.com/xiao555/New-Blog/tree/c8b6e2d909f284d10a484272ac215043978900ed), 后面因为其他事情就没再搞。

在考完java和算法之后，花了两三天才把之前的半成品完善了一下，改动如下：
* 改为比较正常sidebar
* 取消顶部导航菜单
* markdown渲染弃用vue-markdown，自己用marked + highlight.js + uslug 打造一个语法高亮，能自动生成toc的组件
* 取消了category和tag页面，增加archive页面
* 构建工具上切换回dev模式，毕竟还要边改边看效果

#### 2017.6.7
* 实现Archive页面逻辑
* 测试production环境下build & start 失败，只有外部css，没有组件内css，原因是都用`extract-text-webpack-plugin` 单独打包到`style.css`，外部css把组件内的覆盖掉了，解决办法：查询文档，用`const extractCSS = new ExtractTextPlugin('css/[name].css');`来实现Multiple Instances。
* 用`vue-meta`实现title的自动更新，同时服务端`server.js`也要进行相应的修改，优化SEO

#### 2017.6.8
* 增加响应式布局
* 服务器上跑了下，修复了部分依赖没有的问题
* 发现admin和client分开的话，部署运行都要各跑一遍，太麻烦，于是admin合并到client，重构后的client由blog和admin组成，也算同构了一下
* 每个过程都在不断的优化代码结构，明天把一些配置项整合出来，统一管理

#### 2017.6.12
这两天太浪了~
* 增加文章阅读计数功能
* 配置项统一在 `config/index.js` 里
* 部署后发现https图标不是绿色的，以为我的免费Let's Encrypt 证书有问题...最后搞了半天发现是因为有http的图片外链，图片之前放在七牛上的，打算服务器上搞一波，再看看有没有什么好的支持https的CDN
* 调试服务器过程中发现我的网页加载有点慢，主要是生成的`app.js`太大了，有1M多，后面可以优化一下，减少依赖库的使用，发现一个`highlight.js`就占了三四百K。

所以后面主要任务是解决一下http外链的问题，优化一下性能。

* 外链问题解决了，用的[netlify](https://www.netlify.com/)，可以直接导入github的repo，很方便，就是国外的有点慢

#### 2017.7.22
趁周末在公司做些自己的事23333
之前分析了提高性能的一些方法，主要是减少打包生成的app.js的体积，这次更新前运行`npm run build`的结果是这样的：

```bash
Total precache size is about 2.75 MB for 12 resources.
Hash: 8a46e668ed80f8d7a493
Version: webpack 2.6.1
Time: 32802ms
                                         Asset       Size  Chunks                    Chunk Names
    static/fonts/FFMetaPro-Normal.ec7ccf1.woff    71.7 kB          [emitted]
    static/img/fontawesome-webfont.912ec66.svg     444 kB          [emitted]  [big]
  static/fonts/fontawesome-webfont.b06871f.ttf     166 kB          [emitted]
static/fonts/fontawesome-webfont.af7ae50.woff2    77.2 kB          [emitted]
 static/fonts/fontawesome-webfont.fee66e7.woff      98 kB          [emitted]
       static/img/FFMetaPro-Normal.5d836bf.svg    2.12 MB          [emitted]  [big]
     static/fonts/FFMetaPro-Normal.4eebf0c.eot     200 kB          [emitted]
     static/fonts/FFMetaPro-Normal.3767f35.ttf     199 kB          [emitted]
  static/fonts/fontawesome-webfont.674f50d.eot     166 kB          [emitted]
                                        app.js    1.27 MB       0  [emitted]  [big]  app
                                     vendor.js  810 bytes       1  [emitted]         vendor
                                      style.js  263 bytes       2  [emitted]         style
                                   manifest.js    1.39 kB       3  [emitted]         manifest
                                   css/app.css    27.5 kB       0  [emitted]         app
                                 css/style.css    39.1 kB       2  [emitted]         style
                                    index.html    1.26 kB          [emitted]

> client@1.0.0 build:server /var/www/New-Blog/client
> cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules

Hash: c1685fd6bd9a9bb148a6
Version: webpack 2.6.1
Time: 9352ms
              Asset     Size  Chunks                    Chunk Names
vue-ssr-bundle.json  1.72 MB          [emitted]  [big]
```

可以看到一个app.js就占了1.27MB, 此时网页加载的情况是这样的:
![](https://xiao555.netlify.com/preyouhua.jpg)
然后我看了一下别人的app.js，压缩后基本都是几十k大小，而我是几百k，所以app.js的大小是一个优化点，在分析了为何app.js这么大后，我进行了如下优化：

* 减少对这些库的依赖，'marked','highlight.js','uslug', 'vuejs-datepicker', 'Vuex'
* markdown 渲染放在server端进行，article Model增加存放markdown的字段，对数据库中的旧数据创建Migration脚本

优化后运行`npm run build`的结果是这样的：
```bash
Total precache size is about 1.63 MB for 12 resources.
Hash: 85db4cfa5f72482c3c59
Version: webpack 2.3.0
Time: 10386ms
                                         Asset       Size  Chunks                    Chunk Names
                                        app.js     203 kB       0  [emitted]         app
    static/img/fontawesome-webfont.912ec66.svg     444 kB          [emitted]  [big]
  static/fonts/fontawesome-webfont.b06871f.ttf     166 kB          [emitted]
static/fonts/fontawesome-webfont.af7ae50.woff2    77.2 kB          [emitted]
 static/fonts/fontawesome-webfont.fee66e7.woff      98 kB          [emitted]
       static/img/FFMetaPro-Normal.5d836bf.svg    2.12 MB          [emitted]  [big]
     static/fonts/FFMetaPro-Normal.4eebf0c.eot     200 kB          [emitted]
     static/fonts/FFMetaPro-Normal.3767f35.ttf     199 kB          [emitted]
    static/fonts/FFMetaPro-Normal.ec7ccf1.woff    71.7 kB          [emitted]
  static/fonts/fontawesome-webfont.674f50d.eot     166 kB          [emitted]
                                     vendor.js  810 bytes       1  [emitted]         vendor
                                      style.js  253 bytes       2  [emitted]         style
                                   manifest.js    1.38 kB       3  [emitted]         manifest
                                   css/app.css    22.1 kB       0  [emitted]         app
                                 css/style.css    39.2 kB       2  [emitted]         style
                               css/app.css.map    29.6 kB       0  [emitted]         app
                             css/style.css.map    36.1 kB       2  [emitted]         style
                                    index.html    1.23 kB          [emitted]

> client@1.0.0 build:server /Users/zhangruiwu/Desktop/demo-learn/newBlog/client
> cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules

Hash: 5b9d7f18053508c4e7a5
Version: webpack 2.3.0
Time: 4008ms
              Asset    Size  Chunks                    Chunk Names
vue-ssr-bundle.json  556 kB          [emitted]  [big]
```

效果显著，可以看到总大小由2.75 MB减小的1.63 MB， app.js由1.27 MB减小到203 kB， vue-ssr-bundle.json也从1.72 MB减小到556 kB。我们再看看部署到服务器后网页加载情况：
![](https://xiao555.netlify.com/afteryouhua.jpg)
效果显著有没有，Load从4.15s减小到了1.31s，如果再要优化的话，其实也就是减少请求数，然后优化一下头像的处理，想到两种方案，一种换成base64，结果发现app.js变大了许多，编码有点多。第二种换成webp格式，效果如下：
![](https://xiao555.netlify.com/afterwebp.jpg)
加载速度减小的1s以内了。

后面再该合并的合并，cdn的cdn，首屏加载性能方面的问题就基本解决的差不多了。先睡觉了==！

#### 2017.8.27

对client部分进行了一次重构，参考最新的[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)，很多module都升级了几个小版本，功能也越来越多，一些功能也出现了一些新的实现方式。

preFetch 变成了 asyncData，之前的版本我把preFetch去掉了，后来感觉这样会影响组件加载速度吧，感觉不妥。所以这次把asyncData和vuex都重新启用。为什么要启用vuex呢，因为个人感觉asyncData是需要靠一个全局对象来保存状态或者说是数据的，要自己实现还不如直接用vuex...而且新版本webpack打包起来大小比以前小了好多好多，多一个vuex不会影响app.js，会打包到vendor里。打包后的组件部分js是分成若干个文件按需加载，也分担了app.js的大小。

* 重新启用vuex，探索了一下数据获取的方式，最后还是加入了asyncData异步加载。
* 加入了文章列表分页功能，虽然现在只有一页
* 精简优化webpack配置文件
* 新的title机制
* 顶部进度条
* font-awesome字体文件改为CDN引入

#### 2017.8.31

上Docker！！！Node.js, MongoDB, Redis三部分各一个容器，本来还用Nginx,但是涉及到https证书什么的好麻烦，要迁移的话反而麻烦，所以除了上面那三部分可以随时随地跑，nginx就单独配置吧。

### TODO

* 评论区
* 管理后台界面优化，目前是仿WordPress
* 重构，改成同构Web应用
* 服务器端（腾讯云）的优化
* 数据库定期备份

### LICENSE

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
