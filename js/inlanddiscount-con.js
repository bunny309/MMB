document.write("<script src='/bunny309_base.js'></script>");
$(function () {

    // 获取inlanddiscount.html传来的id
    var id = getQueryString('id');
    console.log(id);
    // 这个是截取地址上的字符串的方法
    // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }
    // 调用API，获取商品详情的数据
    // 传参数id
    getInland();

    function getInland() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:9090/api/getdiscountproduct',
            data: {
                productid: id
            },
            dataType: 'json',
            success: function (data) {
                console.log(data.result);
                var html = template('detailCon', data.result[0]);
                $('.inland-con').html(html);
            }

        })
    }

    // 点击添加评论

    $('.inland-con').on('tap', '.tjdp', function () {
        // console.log(111);
        var con = $('textarea').val();
        console.log(con);
        // for(var i = 0;i < )
        // $('.list ul').html('<li></li>').each(function(i,val){
        //     console.log(val);
        // });
        // $('.list ul').html('<li>1</li>');

        // 父容器
        // var fa = $('.list ul');
        // // 字容器
        // var child = $('<li></li>'); //创建一个子div 
        // child.appendto(fa); //将子div添加到父div中


        // for (var i = 0; i < 100; i++) {
        $('.list ul').html('<li></li>').append(con);
        // }
        $('textarea').val('');

    })


    // 点击头部【慢慢买】跳转到首页
    $('.header-box').on('tap', function () {
        location = "../index.html";
    })


})