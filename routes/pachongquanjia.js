import cheerio from 'cheerio';
import rp from 'request-promise';
import _ from 'lodash';

const sleep = time => new Promise(resolve => setTimeout(resolve,time)) //发动一次休息

let _shop = [];
let _area = '全家'
let _areaDetail= [];
export const pachong = (res,req,next)=>{
    getshop();
}
export const getshop = async (page = 1,area = '全家') =>{
    const options={
        uri:`http://www.dianping.com/search/keyword/1/0_全家/p${page}`,
        transform: body => cheerio.load(body),
    }
    console.log("正在爬"+options.uri);
    const $ = await rp(options)
    let shop = [];
    
    $(".txt").each(function(){ //这里不能用箭头函数，会拿不到this
        const name = $(this).find("h4").text();
        const adress =  $(this).find(".addr").text();
        const qu = $(this).find(".tag").text();
        const perConsume = $(this).find(".comment").find(".mean-price").text();
        const sums = $(this).find(".comment").find(".review-num").text();

        shop.push({
            name,
            qu,
            perConsume,
            adress,
            sums
        })
    })
        _shop = _.union(_shop,shop)

    if($('.next').attr('href')){
        //writeFileSync("./static/shop.json",JSON.stringify(_shop,null,2),'utf-8')
        console.log(`${area}共有${_shop.length}条数据`)
        await sleep(1000);  
        page++;
        console.log(page)
        await getshop(page,_area)
    }else{
        console.log("爬完了！"+_shop.length)
        console.log(_shop);
        return _shop
    }
}
