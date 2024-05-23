
let xlsx = require('node-xlsx');
// let md5 = require('blueimp-md5');
let Hashes = require('jshashes');
let MD5 = new Hashes.MD5;

module.exports = {

    async wate(ctx) {
        // let obj = xlsx.parse('./config/duid.xls');
        // console.log(JSON.stringify(obj[0]));
        let arr = [];
        // obj[0].data.forEach(o => {
        //     arr.push(Hashes.CRC32(o[0]));
        // });
        // obj2[0].data.forEach(o => {
        //     arr.push(Hashes.CRC32(o[0]));
        // });
        let set = new Set(arr);
        let remainder = [];
        arr.forEach(o => {
            remainder.push(o % 100);
        });
        remainder.sort((a, b) => {
           return a - b;
        });
        let filter = new Set(remainder);
        let fmap = new Map();
        let fmapArr = [];
        let aX= [];
        let aY= [];
        filter.forEach(o => {
            let count = remainder.filter(e => e === o);
            fmap.set(o, count.length);
            fmapArr.push({
                key: o,
                value: count.length
            });
            aX.push(o);
            aY.push(count.length);
        });
        console.log(fmap);

        await ctx.render('wate', {
            title: 'dddddddd',
            description: 'aaa',
            keywords: 'ddd',
            count: set.size,
            list: fmapArr,
            axis: {X: aX, Y: aY}
        });
        // ctx.body = '<div>' + set.size + '条记录11</div><div>' + remainder.join('<br/>') + '</div>';
    }
};
