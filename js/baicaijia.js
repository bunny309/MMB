$(function () {

    let allScroll; // 全局的iscroll插件对象引用

    // 导航栏渲染
    $.ajax({
        url: "http://localhost:9090/api/getbaicaijiatitle",
        success: function (res) {
            console.log(res);
            let navHtml = template('navTpl', res);
            $('.nav-box').html(navHtml);
        }
    });

    // 渲染函数
    function render(id) {
        $.ajax({
        url: "http://localhost:9090/api/getbaicaijiaproduct",
        data: {titleid: id},
        success: function (res) {
            console.log(res);
            let obj = res.result[0];
            console.log(obj);
            // 获取图片src
            let imgReg = /src="(.*)"/g;
            let imgsrc = imgReg.exec(obj.productImg)[1];
            console.log(imgsrc);

            // 商品描述 desc
            let descReg = /span>(.*)/g;
            let desc = descReg.exec(obj.productName)[1];
            console.log(desc);

            // 商品前后价格
            let priceReg = /<\/em>(.*)<del>(.*)<\/del>/;
            let price = priceReg.exec(obj.productPrice);
            let now = price[1];
            let old = price[2];
            console.log(now, old);

            // 进度条数据: 返回的数据没有, 自己构造
            let ratio = parseInt(Math.random()*80 + 20);
            console.log(ratio);

            // 已领取券的数量, 自己构造
            let ticketNum = parseInt(Math.random()*200 + 50);
            console.log(ticketNum);

            // 优惠券的面额
            let ticketVal = parseInt(Math.random()*50 + 10);
            console.log(ticketVal);

            // 修改对象中对应的值
            res.result.forEach(item => {
                item.desc = /span>(.*)/g.exec(item.productName)[1]; // 图片
                item.imgsrc = /src="(.*)"/g.exec(item.productImg)[1]; // 描述
                item.now = /<\/em>(.*)<del>(.*)<\/del>/.exec(item.productPrice)[1]; // 现价
                item.old = /<\/em>(.*)<del>(.*)<\/del>/.exec(item.productPrice)[2]; // 原价
                item.ratio = parseInt(Math.random()*80 + 20); // 进度条
                item.ticketNum = parseInt(Math.random()*200 + 50); // 优惠券数量
                item.ticketVal = parseInt(Math.random()*50 + 10);  // 优惠券价值
            });
            console.log(res.result);
            // 模板渲染
            let contentHtml =template('contentTpl', res);
            $('.content').html(contentHtml);

            // 初始化
            let myScroll = new IScroll('.iscroll', {
                scrollbars: true,
                bounce: true,
            });

            allScroll = myScroll;
            // 进度条初始化
            console.log($('.mui-progressbar'));
            Array.from($('.mui-progressbar')).forEach(item => {
                mui('.' + item.classList[1]).progressbar({progress: item.dataset.ratio}).show();
            })
        }
    });
    }

    // 页面首次渲染
    render(1);
    

    // 侧边栏显示,隐藏
    $('#header .left').on('tap', function () {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    $('.back').on('tap', function () {
        mui('.mui-off-canvas-wrap').offCanvas('close');
    });

    // 返回顶部按钮功能
    $('.content')[0].addEventListener('touchmove', function() {
        console.log($('.content').css()[0].style.transform.match(/\d+/g)[1]);
        let y = $('.content').css()[0].style.transform.match(/\d+/g)[1] - 0;
        
        y > 210 ? $('.to-top').show() : $('.to-top').hide();
    })

    // 点击返回
    $('.to-top').on('tap', function() {
       allScroll.scrollTo(0, 0, 1000);
    })

    // 首页跳转
    $('#header .title').on('tap', function(){
        location = '../index.html';
    })

    // 分页面渲染
    $('.nav-box').on('tap', 'a', function(){
        console.log(this);
        let id = $(this).data('id');
        console.log(id); 
        
        render(id);
    })

});

// 慢慢买 MMP类
// class MMP {
//     // 公共属性
//     constructor() {

//     }

//     // 初始化模块
//     init() {

//     }

//     // 渲染模块
//     render() {

//     }

//     // 顶部返回
//     toTop() {

//     }

//     // 主,侧页面切换
//     switchPage() {

//     }

// }



















