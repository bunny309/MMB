$(function () {

    // 获取到url传递过来的id
    var caId = GetQueryString('productTitleId');
    // 获取对应的id将当前的分类标题显示在页面顶部
    $.ajax({
        url:'http://47.52.242.30:9090/api/getcategorybyid',
        data: {
            categoryid: caId
        },
        success: function (obj) {
            console.log(obj.result[0]);
            // 调用模板
            var html = '<span><a href="">' + obj.result[0].category + '</a></span>';
            $('#header .left').append(html);
        }
    });

    // 获取商品id
    var productid = GetQueryString('productId');
    console.log(productid);
    // 将商品详情显示在页面上
    $.ajax({
        url: 'http://47.52.242.30:9090/api/getproduct',
        data: {
            productid: productid
        },
        success: function (obj) {
            var strImg = obj.result[0].productImg;
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var src = strImg.match(srcReg);
            obj.result[0].productImg = src[1];
            console.log(obj);

            var html = template('productTpl',{list:obj.result[0]});
            $('.productDetail').html(html);
        }
    });

    // 将评论显示在页面上
    $.ajax({
        url: 'http://47.52.242.30:9090/api/getproductcom',
        data: {
            productid: productid
        },
        success: function (obj) {
            console.log(obj);
            var html = template('pingLunTpl',obj);
            $('.content').html(html);
        }
    });

        // 返回顶部呃点击事件
    $('.top-back').on('tap',function (e) {
        e.preventDefault();
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);
    })



    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 截取地址里需要的参数,网上百度
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})