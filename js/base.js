$(function () {

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
        location = 'index.html';
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
        location = '../pages/'+href;
    })


    // 对圆点进行操作
    // 点击变大,变小
    $('#dots').on('tap', function () {
        // 点击切换
        $(this).toggleClass('active');
        // 做判断
        if ($(this).hasClass('active')) {
            $(this).animate({
                    width: '1.2rem',
                    height: '1.2rem',
                }),
                $('#dots>div').fadeIn()
        } else {
            $(this).animate({
                    width: '0.4rem',
                    height: '0.4rem',
                }),
                $('#dots>div').fadeOut();
        }
    })

    // 点击圆点对应的图片,进行对应的跳转
    $('.dots-1').on('tap', function () {
        location = '../pages/category.html';
    })
    $('.dots-2').on('tap', function () {
        location = '../pages/moneyctrl.html';
    })
    $('.dots-3').on('tap', function () {
        location = '../pages/inlanddiscount.html';
    })
    $('.dots-4').on('tap', function () {
        location = '../pages/baicaijia.html';
    })

    //  对圆点进行移动操作
    var startX,startY,moveX,moveY,shortX,shortY,distanceX,distanceY;
    // touchstart事件
    // $('#dots')[0].addEventListener('touchstart', function (e) {
    //     //阻止触摸时页面的缩放
    //     e.preventDefault(); 
    //     // 获取手指位置
    //     startX = e.targetTouches[0].clientX;
    //     startY = e.targetTouches[0].clientY;
    //     // 获取手指相对于圆点的距离
    //     shortX = startX - this.offsetLeft;
    //     shortY = startY - this.offsetTop;
    //     // console.log(shortX);
    //     // console.log(shortY);
    // })
    // // touchmove事件
    // $('#dots')[0].addEventListener('touchmove',function (e) { 
    //     // 不断获取移动位置
    //     moveX = e.targetTouches[0].clientX;
    //     moveY = e.targetTouches[0].clientY;
    //     // 计算偏移
    //     distanceX = moveX - shortX;
    //     distanceY = moveY - shortY;
    //     // 获取可以移动的最大距离
    //     moveBigX = document.documentElement.clientWidth - this.offsetWidth || document.body.clientWidth -this.offsetWidth;
    //     moveBigY = document.documentElement.clientHeight - this.offsetHeight || document.body.clientHeight -this.offsetHeight;
    //     // console.log(moveBigX);
    //     // console.log(moveBigY);
    //     // 限制移动距离
    //     if(distanceX < 0){
    //         distanceX = 0;
    //     } else if (distanceX > moveBigX){
    //         distanceX = moveBigX;
    //     }
    //     if(distanceY < 0){
    //         distanceY = 0;
    //     } else if (distanceY > moveBigY){
    //         distanceY = moveBigY;
    //     }
    //     // 开始偏移
    //     this.style.left = distanceX + 'px';
    //     this.style.top = distanceY + 'px';
    //  })
    // //  touchend事件
    // $('#dots')[0].addEventListener('touchend',function(e){
    //     e.preventDefault(); 
    // })
})