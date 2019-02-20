$(function () {  
        //页面加载发送请求生成所有10大品牌模板
       
        $.ajax({
            // type: "method",
            url: "http://47.52.242.30:9090/api/getbrandtitle",
            // data: "data",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = template('brandtitleTpl',response)
               $('.brandList').html(html)
               
            }
        });

        //点击品牌发送请求刷新页面
        $('.brandList').on('tap','li',function () {  
            var brandtitleid = $(this).data('id')
            location = `brand-content.html?brandtitleid=${brandtitleid}`
        })
    
})