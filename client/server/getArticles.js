const request = require('axios');
const fs = require('fs');
const path = require('path');
// const api = 'https://www.xiao555.com.cn/api/articles?status=Published'
const api = 'http://localhost:3000/api/articles?status=Published'
const about = 'http://localhost:3000/api/articles?path=about'

request.get(api).then(res => {
  // console.log(JSON.stringify(res.data));
  const articles = res.data;
  request.get(about).then(res => {
    articles.push(res.data[0]);
    // console.log(articles);
    fs.writeFile(path.resolve(__dirname, '../articles.json'), JSON.stringify(articles), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  }).catch(e => console.log(e));
}).catch(e => console.log(e));
