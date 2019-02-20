$(function () {

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

    // 获取到url传递过来的id
    var caId = GetQueryString('id');
    // 获取对应的id将当前的分类标题显示在页面顶部
    $.ajax({
        url:'http://47.52.242.30:9090/api/getcategorybyid',
        data: {
            categoryid: caId
        },
        success: function (obj) {
            console.log(obj);
            // 调用模板
            var html = template('nameTpl',obj);
            $('#header .left').html(html);
        }
    });
    
    // 声明一个全局变量页码数;
    var pageid = 1;
    // 声明一个全局变量总页数
    var page;
    // 商品列表数据请求
    pageRendering();
    // 封装好的商品列表数据请求
    function pageRendering() {
        $.ajax({
            url: 'http://47.52.242.30:9090/api/getproductlist',
            data: {'categoryid': caId,
                    'pageid': pageid
                },
            success: function (obj) {
                console.log(obj);
                var proImg = obj.result;
                // 截取传回来的数据中的图片地址
                proImg.forEach(function (value,i) {
                    var strImg = value.productImg;
                    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                    var src = strImg.match(srcReg);
                    proImg[i].productImg = src[1];
                });
    
                // 如果返回的数据为空 提示用户没有更多产品了
                if (obj.result.length > 0) {
                     // 调用商品列表模板
                    var html = template('productTpl',obj);
                } else {
                    $('#main').html('<p>没有更多产品了</p>');
                }
                $('#main .product').html(html);
    
                // 分页功能
                page = Math.ceil(obj.totalCount / obj.pagesize)//算出当前商品种类有几页
                //循环有多少页就有多少个option
                var pageOption = '';
                for (var i = 1;i <= page; i++) {
                    pageOption += '<option value='+ i + '>'+ i + '/' + page + '</option>';
                };
                // 将option显示到页面上
                $('#main #select').html(pageOption);
                //当前页面显示第几页 就把select的option的第几个选中

                $('option').eq(pageid - 1).attr('selected',true);
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,10);
            }
        });
    };

     // 获取当前option选择的是第几页
     $('#select').on('change',function(){
        // 将获取到option里面的value值 赋值给 页面id
        pageid = $(this).val();
        // 根据页面id渲染页面
        pageRendering();
        
        
     });

    //  上一页下一页的点击事件
    $('.prev-btn').on('tap',function (e) {
        e.preventDefault();
        pageid--;
        if (pageid > 0) {
            pageRendering();
        } else {
            pageid = page;
            pageRendering();
            
        }
    });
    
    $('.next-btn').on('tap',function (e) {
        console.log(page);
        e.preventDefault();
        pageid++;
        if (pageid <= page) {
            pageRendering();
        } else {
            pageid = 1;
            pageRendering();
        }
    });

    // 每个商品的点击事件
    $('.product').on('tap','li',function () {
        var brandid = $(this).data('brandid');
        location = 'productDetails.html?productId=' + brandid +'&productTitleId=' + caId;
    });

    // 返回顶部呃点击事件
    $('.top-back').on('tap',function (e) {
        e.preventDefault();
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);
    })

})