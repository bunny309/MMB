$(function () {
    $('#footer').data('id');
    queryShop();
    queryArea();
    queryproduct(0,0);
    showProduct();
  

   

   
    // 店铺名的渲染
    function queryShop() {
       
        $('#mmb-nav .nav-content').on('tap','.mmb-shopList',function(){
            $('.shop-title').text($(this).text());
            
        })
       
        $.ajax({
            url: 'http://localhost:9090/api/getgsshop',
            success: function (data) {
                //    console.log(data);
                var html = template('mmbShopTpl', data);
                $('.mmb-Shop').html(html);
            }
        });
    }
    // 地区的渲染
    function queryArea() {
        $('#mmb-nav .nav-content').on('tap','.area-list',function(){
            $('.area-title').text($(this).text());
            
        })
        $.ajax({
            url: 'http://localhost:9090/api/getgsshoparea',
            success: function (data) {
                //  console.log(data);
                var html = template('areaTpl', data);
                $('.mmb-area').html(html);
            }
        })
    }

    
    // 产品块的渲染
    function showProduct() {
        // 因为店铺和区域是动态添加的，所以注册事件得用事件委托
        $('#mmb-nav .nav-content').on('tap', 'li', function () {
            $('#mmb-nav .shop-title').attr('data-shop-id', $(this).data('shop-id'));
            $('#mmb-nav .area-title').attr('data-area-id', $(this).data('area-id'));
            // $('.shop-title').text($(this).text());
            // $('.area-title').text($(this).text());
            // 获取店铺id和区域 id
            
            
            var shopid = $('.shop-title').attr('data-shop-id');
            var areaid = $('.area-title').attr('data-area-id');
            // console.log(shopid,areaid);
            queryproduct(shopid,areaid);
        })
    }

    function queryproduct(shopid,areaid){


        $.ajax({
            url: 'http://localhost:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function (data) {
                var html = template('productTpl', { data: data.result });
                $('.product-list').html(html);

            }
        })
    }


    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: pulldownRefresh
            },
            up: {
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullupRefresh
            }
        }
    });
    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        setTimeout(function() {
           
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            mui('#pullup-container').pullRefresh().refresh(true);
        }, 1500);
    }
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        setTimeout(function() {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
         
            
        }, 1500);
    }
    
    
});