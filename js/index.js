$(function () {

    // 手动初始化scroll控件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 轮播图的初始化
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
    });

    //给logo注册点击事件  点击跳转到首页
    $('.logo').on('tap', function () {
        location = 'imdex.html';
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
        // console.log(href);
        if (href == 'history.html' || href == 'more.html') {
            return false;
        }
        // 进行跳转
        location = '../pages/' + href;
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
    var startX, startY, moveX, moveY, shortX, shortY, distanceX, distanceY;
    // touchstart事件
    $('#dots')[0].addEventListener('touchstart', function (e) {
        //阻止触摸时页面的缩放
        e.preventDefault();
        // 获取手指位置
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        // 获取手指相对于圆点的距离
        shortX = startX - this.offsetLeft;
        shortY = startY - this.offsetTop;
        // console.log(shortX);
        // console.log(shortY);
    })
    // touchmove事件
    $('#dots')[0].addEventListener('touchmove', function (e) {
        // 不断获取移动位置
        moveX = e.targetTouches[0].clientX;
        moveY = e.targetTouches[0].clientY;
        // 计算偏移
        distanceX = moveX - shortX;
        distanceY = moveY - shortY;
        // 获取可以移动的最大距离
        moveBigX = document.documentElement.clientWidth - this.offsetWidth || document.body.clientWidth - this.offsetWidth;
        moveBigY = document.documentElement.clientHeight - this.offsetHeight || document.body.clientHeight - this.offsetHeight;
        // console.log(moveBigX);
        // console.log(moveBigY);
        // 限制移动距离
        if (distanceX < 0) {
            distanceX = 0;
        } else if (distanceX > moveBigX) {
            distanceX = moveBigX;
        }
        if (distanceY < 0) {
            distanceY = 0;
        } else if (distanceY > moveBigY) {
            distanceY = moveBigY;
        }
        // 开始偏移
        this.style.left = distanceX + 'px';
        this.style.top = distanceY + 'px';
    })
    //  touchend事件
    $('#dots')[0].addEventListener('touchend', function (e) {
        e.preventDefault();
    })

    // 渲染菜单栏
    $.ajax({
        url: 'http://localhost:9090/api/getindexmenu',
        success: function (res) {
            // console.log(res);
            // 获取截取完之后的字符串
            getQueryString(res.result)

            // 生成模板
            var navHtml = template('navTpl', res);

            // 添加到页面
            $('.nav>ul').html(navHtml);
        }
    })

    // 对菜单栏的更多注册点击事件
    $('.nav').on('tap', '.more', function () {
        // 切换类名active
        $(this).toggleClass('active');
        // 如果有active的高度就为3rem;
        if ($(this).hasClass('active')) {
            $('.nav').animate({
                height: '3rem'
            })
        } else {
            // 如果没有这个active类名 高度就为2rem;
            $('.nav').animate({
                height: '2rem'
            })
        }
    })

    // 对菜单栏进行注册点击跳转事件 
    $('.nav').on('tap', 'li', function () {
        var href = $(this).data('href');
        // console.log(href);
        if (href == 'history.html' || href == 'more.html') {
            return false;
        }
        // 进行跳转
        location = '../pages/' + href;
    })

    // 对折扣列表发送ajax请求
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        success: function (res) {
            // console.log(res);
            // 生成模板
            var productListsHtml = template('productListsTpl', res);
            // 添加到页面
            $('.productList .content ul').html(productListsHtml);
        }
    })

    // 给折扣商品注册点击事件
    $('.content ul').on('tap', 'li', function () {
        location = '../pages/moneyctrl.html';
    })

    $('.saving-money').on('tap', function () {
        location = '../pages/moneyctrl.html';
    })

    // 给页面右下角的置顶图标注册事件
    // 默认隐藏 当页面滑动距离超出时显示
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#scrollTopFooter").fadeIn(1000);
        } else {
            $("#scrollTopFooter").fadeOut(1000);
        }
    });

    // 点击置顶
    $('#scrollTopFooter').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000)
    })

    //给底部的返回顶部注册事件
    $('.footer-up-top').on('tap', function () {
        // 点击之后,回到页面顶部
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    })

    // 对后台返回数据img的截取
    function getQueryString(data) {
        // 遍历数组
        for (var k = 0; k < data.length; k++) {
            // 去除掉 <img src="images/ic_search.png" alt="比价搜索"> 的前5位  
            var name = data[k].img.substr(5, data[k].img.length - 1);
            // 以空格为准 分割成数组
            var arr = name.split(' ');
            // 遍历数组
            for (var i = 0; i < arr.length; i++) {
                // var res = arr[i].split('=')
                // 找到以src开头的字符串
                if (arr[i].split('=')[0] == "src") {
                    //  console.log((arr[i].split('=')[1]));
                    // 取值"images/ic_search.png"
                    var img = arr[i].split('=')[1];
                    // 去掉 ""
                    data[k].img = img.substr(1, img.length - 2);
                }
            }
        }
        // console.log(data);
    }
})