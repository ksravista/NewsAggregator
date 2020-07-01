
const cheerio = require('cheerio');
let axios = require("axios");

const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(require("body-parser").json());

app.get('/cnn/:sub', (req, res) => {

  let sub = req.params.sub;
  axios.get('https://www.cnn.com/' + sub).then((response) => {

    let html = response.data;

    let $ = cheerio.load(html);
    ret = [];
    let test = $('.cd__headline-text').each((index, element) => {

      ret.push({
        id: index,
        href: "https://www.cnn.com" + element.parent.attribs.href,
        title: element.children[0].data
      });
    });
    return res.send(ret);
  }).catch(err => {
    console.log(err);
  });


});

app.get('/yahoo/:sub', (req, res) => {

  //get the sub page within yahoo
  let sub = req.params.sub;
  axios.get("https://news.yahoo.com/" + sub).then(response => {
    let html = response.data;

    let $ = cheerio.load(html);
    ret = [];
    let test = $('.not-isInStreamVideoEnabled').each((index, element) => {
      ret.push({
        id: index,
        href: 'https://news.yahoo.com' + $(element)['0'].attribs.href,
        title: $(element).text()
      });
    });
    console.log(ret);
    return res.send(ret);
  }).catch(err => {
    console.log(err);
  });

});

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
