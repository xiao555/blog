const isDev = process.env.NODE_ENV !== 'production'

const dev = {
  api: 'http://localhost:3000/api',
  siteInfo: {
    siteUrl: 'http://localhost:8008/',
    postUrl: 'http://localhost:8008/posts/'
  }
};
const prod = {
  api: 'https://www.xiao555.com.cn/api',
  siteInfo: {
    siteUrl: 'https://www.xiao555.com.cn/',
    postUrl: 'https://www.xiao555.com.cn/posts/'
  }
};

const info = isDev ? dev : prod;

export default Object.assign(info, {
  links: {
    github: "https://github.com/xiao555",
    facebook: "https://www.facebook.com/profile.php?id=100009127309661",
    email: "mailto: zhangruiwu32@gmail.com",
    weibo: "http://weibo.com/u/5315649743",
    zhihu: "https://www.zhihu.com/people/zhang-rui-wu-50",
    rss: "#"
  },
  headerImg: "https://xiao555.netlify.com/header.jpg",
  titleTemplate: " | Xiao555's Blog",
})
