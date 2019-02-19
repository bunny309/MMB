$(function () {
    // 对商城导航进行渲染
    $.ajax({
        url: 'http://localhost:9090/api/getsitenav',
        success: function (res) {
            // 生成模板
            var html = template('sitenavTpl', res);

            // 添加到页面
            $('.list-group').html(html);
        }
    });

    // 对商城导航注册点击事件
    $('.list-group').on('tap', '.list-group-item', function () {
        
        // 获取要跳转的href值
        var href = $(this).data('href');
        // 进行跳转
        location = href;
    })

    // 手动初始化scroll控件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //给底部的返回顶部注册事件
    $('.footer-up-top').on('tap', function () {
        // 点击之后,回到页面顶部
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    })

    //给logo注册点击事件  点击跳转到首页
    $('.logo').on('tap', function () {
        location = '../index.html';
    })

    // 渲染头部
    $.ajax({
        url: 'http://localhost:9090/api/getindexmenu',
        success: function (res) {
            // console.log(res);
            // 生成模板
            var html = template('headerScroll', res);

            // 添加到页面
            $('.header-scroll-box').html(html);
        }
    })

    // 对头部进行注册点击跳转事件 
    $('.header-scroll-box').on('tap', 'li', function () {
        var href = $(this).data('href');
        console.log(href);
        if (href == 'history.html' || href == 'more.html') {
            return false;
        }
        // 进行跳转
        location =  href;
    })

})