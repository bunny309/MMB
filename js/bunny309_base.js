$(function () {

    // 手动初始化scroll控件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //给底部的返回顶部注册事件
    $('.footer-up-top').on('tap',function () {
        // 点击之后,回到页面顶部
        $('html,body').animate({scrollTop:0},1000);
      })

    //给logo注册点击事件  点击跳转到首页
    $('.logo').on('tap',function () {
        location = 'index.html';
      })


})