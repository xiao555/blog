const request = require('axios');
const fs = require('fs');
const api = 'https://www.xiao555.com.cn/api/articles?status=Published'

request.get(api).then(res => {
  console.log(res.data[0]);
  fs.writeFile('articles.json', JSON.stringify(res.data[0]), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  }); 
})