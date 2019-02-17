

let fs = require('fs');

module.exports = {

    async fileUpload(ctx) {
        //异步方法
        fs.writeFile('./upload/message.txt', '这是第一行',function(err){
            if(err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });

        //同步方法
        // fs.writeFileSync('./message.txt','这是第一行');
        await ctx.render('fileupload', {
            title: 'dddddddd',
            description: 'aaa',
            keywords: 'ddd'
        });
    }
};
