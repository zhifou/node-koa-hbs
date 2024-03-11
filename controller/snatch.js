
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {

    async index(ctx) {
        const url = 'http://gzhxy-map-bus-bus046.gzhxy.baidu.com:8989/20200212.html';

        const book = {};

        let result = await axios.get(url).then(function(res) {

            let $ = cheerio.load(res.data,{
                decodeEntities: false
            });

            book.value = 0;

            $('table:first-child tr').each((i, e) => {
                // console.log(i, $(e).text().trim());
                if (i === 16) {
                    $(e).children().each((j, o) => {
                        console.log($(o).text().trim());
                        if (j === 5) {
                            book.value = parseInt($(o).text().trim());
                        }
                    });
                }

            });

            return book;
        });

        console.log(result);
        ctx.body = book;
    },
    async book(ctx) {
        const url = 'http://www.ituring.com.cn/book/1993';

        const book = {};

        let result = await axios.get(url).then(function(res) {

            let $ = cheerio.load(res.data,{
                decodeEntities: false
            });

            // console.log(res.text);

            book.title = $('.book-title h2').text().trim();

            book.intro = $('.book-intro').text().trim();

            book.status = 出版状态 = $('li:contains("出版状态")').text().replace(/出版状态/, '');

            $('.book-author').children().each((i, e)=>{

                let 名字 = $(e).text().trim();
                if (名字.indexOf('(作者)')  != -1) {
                    book.auther = 名字.replace(/\(作者\)/, '').trim();
                }

                if (名字.indexOf('(译者)')  != -1) {
                    book.translator = 名字.replace(/\(译者\)/, '').trim();
                }
            });

            let 定价 = $('li:contains("定　　价")').text().replace(/定　　价/, '');

            if (定价) {
                book.price = 定价;

                let 有电子书 = false;

                let 找电子书 = $('dt').filter( function() {
                    let 有吗 = $(this).text().trim() === '电子书';
                    if (有吗 === true) {
                        有电子书 = true;
                        return true;
                    }
                });

                if (有电子书) {
                    book.ePrice = 找电子书.next().children('.price').text().trim();
                }
            }

            book.tags = [];

            $('.post-tag').each((i, e)=>{
                book.tags.push($(e).text());
            });
            return book;
            // console.log(book);
        });

        console.log(result);
        ctx.body = book;
    }

};