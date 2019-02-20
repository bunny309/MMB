$(function () {  
    //通过url截取获取当前点击的id
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
   var brandtitleid = getQueryString('brandtitleid')
  

     //点击品牌发送请求获取此类id的详情
     $.ajax({
        //  type: "method",
         url: "http://47.52.242.30:9090/api/getbrand",
         data: {
            brandtitleid:brandtitleid
         },
         dataType: "json",
         success: function (response) {
            console.log(response);
            var html = template('brandlistTpl',response)
            $('.brandlist').html(html)
            
         }
     });

     $('.brandlist').on('tap','li',function () {  
        var cagetoryid = $(this).data('cagetoryid')
        
        location = `product-list.html?brandtitleid=${brandtitleid}&pagesize=10&categoryId=${cagetoryid}`
     })
})