$(function () {

    // 分类标题的数据请求
    $.ajax({
        url: 'http://47.52.242.30:9090/api/getcategorytitle',
        success: function (obj) {
            // console.log(obj);
            // 调用模板
            var html = template('categoryTpl',obj);
            $('#main>.category').html(html);
        }
    });

    // 分类标题点击事件
    $('#main .category').on('tap','.cate',function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var index = $(this).data('index');
        if (index == 1) {
            // $(this).siblings('div').find('ul').html('');
            $(this).data('index',0)
             // 分类下的 子类的数据请求
            $.ajax({
                url: 'http://47.52.242.30:9090/api/getcategory',
                data:{titleid: id},
                success: function (obj) {
                    console.log($(this));
                    console.log(obj);
                    //调用模板
                    var html = template('childrenTpl',obj);
                    $('#main>.category>li ul').html(html);
                }
            });
        } else {
            $(this).data('index',1);
           
        }
       
    });

    // 子类的点击跳转事件
    $('#main .category').on('tap','.small',function () {
        var caId = $(this).attr('data-caId');
        location ='productList.html?id=' + caId;
    })
    

    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})