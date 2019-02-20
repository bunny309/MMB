document.write("<script src='/bunny309_base.js'></script>");
$(function () {
    // 调用接口获取商品列表的数据
    inlanCon();
    function inlanCon() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:9090/api/getinlanddiscount',
            dataType: 'json',
            success: function (data) {
                console.log(data.result);
                var html = template('inlandList', {
                    list: data.result
                });
                // console.log(html);
                $('.contentList').html(html);
            }
        })
    }
    // 点击商品，跳转到这个商品的详情页。将id带过去
    // 在详情页，根据id获取详细内容
    $('.contentList').on('tap', '.content', function () {
        // console.log(111);
        var id = $(this).data('id');
        console.log(id);
        location = "inlanddiscount-con.html?id=" + id;
    })

    // 点击头部【慢慢买】跳转到首页
    $('.header-box').on('tap', function () {
        location = "../index.html";
    })
})