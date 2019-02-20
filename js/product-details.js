$(function () {

    // 截取地址里需要的参数,网上百度
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var productId = GetQueryString('productId')
    console.log(productId);

    //发送请求,获取点击产品图片信息和商品名称
    $.ajax({
        // type: "method",
        url: "http://47.52.242.30:9090/api/getproduct",
        data: {
            productid:productId
        },
        dataType: "json",
        success: function (response) {
            
            var html = template('productTpl',response)
            $('.productlist').html(html)
        }
    });


    // 发送请求,获取评论
    $.ajax({
        // type: "method",
        url: "http://47.52.242.30:9090/api/getproductcom",
        data: {
            productid:productId
        },
        dataType: "json",
        success: function (response) {
           var html = template('commentTpl',response)
           console.log(response);
           var html = template('commentTpl',response)
           $('.comment').html(html)
        }
    });


})