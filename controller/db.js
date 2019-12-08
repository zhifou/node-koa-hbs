
let { query } = require('../dao/mysql');

module.exports = {
    async index(ctx) {
        let dataList = await query('select * from my_table');
        console.log(dataList);
        await ctx.render('db/index', {
            title: 'dddddddd',
            description: 'aaa',
            keywords: 'ddd',
            data: dataList
        });
    }
};