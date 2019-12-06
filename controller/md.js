/**
 * @file 读取md文档的controller
 * @author packjs@163.com
 */
const marked = require('marked');
const fs = require('fs');
const path = require('path');

const readFilePromise = filename => {
    new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) {
                reject(err);
                return
            }
            resolve(data);
        })
    })
}

module.exports = {
    async index(ctx) {

        let filePath = path.join(__dirname, '../upload/index.md');
        console.log(filePath);

        let data = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if(err) {
                    reject(err);
                    return
                }
                resolve(data);
            })
        });
        // let data = await readFilePromise(filePath);
        // console.log(data);
        // ctx.body = `
        //     <html>
        //         <head>
        //             <title>123456</title>
        //             <link rel="stylesheet" href="/css/md.css">
        //         </head>
        //         <body>
        //         ${marked(data.toString())}
        //         </body>
        //     </html>
        // `;
        await ctx.render('md/index', {
            title: 'dddddddd',
            description: 'aaa',
            keywords: 'ddd',
            container: marked(data.toString())
        });
    }

};