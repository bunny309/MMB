$(function () {  
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
   var brandtitleid = getQueryString('brandtitleid')
   var pagesize = getQueryString('pagesize')
    $.ajax({
        // type: "method",
        url: "http://47.52.242.30:9090/api/getbrandproductlist",
        data: {
            brandtitleid:brandtitleid,
            pagesize:pagesize
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            var html = template('productlistTpl',response)
            $('.content .mui-table-view').html(html)
        }
    });
    //给每个产品注册点击事件
    $('.content .mui-table-view').on('tap','.productlist',function () {
          var productId = $(this).data('productid')
           
        location = `product-details.html?productId=${productId}`
    })
})