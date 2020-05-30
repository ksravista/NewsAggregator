const cheerio = require('cheerio');
let axios = require("axios");

const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(require("body-parser").json());

app.get('/cnn', (req, res) => {

    axios.get("https://www.cnn.com/us").then(response=>{
      let html = response.data;

      let $ = cheerio.load(html);
      ret =[];
      let test = $('.cd__headline-text').each((element, i) => {
        ret.push({
          id: element,
          href: "https://www.cnn.com" + i.parent.attribs.href,
          title: i.children[0].data
        })
      });
      // console.log(test);

      console.log(ret);
      return res.send(ret);
    }).catch(err =>{
      console.log(err);
    });

    // let html = await (async function() {
    //   axios.get("https://www.cnn.com/").data
    // })();
    
    // return res.send(html);
    
});


app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
