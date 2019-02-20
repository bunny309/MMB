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
                var html = template('inlandList',{list:data.result});
                // console.log(html);
                $('.contentList').html(html);
            }
        })
    }
    // 点击商品，跳转到这个商品的详情页。将id带过去
    // 在详情页，根据id获取详细内容
    $('.contentList').on('tap','.content',function(){
        // console.log(111);
        var id = $(this).data('id');
        console.log(id);
        location = "inlanddiscount-con.html?id="+id;
    })

    // 使用JS初始化下拉刷新
    mui.init({
        pullRefresh: {
            // 指定一个下拉刷新的容器 也是就是区域滚动的父容器
            container: '#pullrefresh',
            // down表示初始化下拉刷新
            down: {
                // callback指的是下拉刷新的回调函数
                callback: pulldownRefresh
            },
            // up表示初始化上拉加载更多
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });
    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        console.log('触发了一次下拉');
        // 回调给你用来刷新数据的  写ajax请求刷新数据
        setTimeout(function () {
            queryProduct();
            // 这句代码：结束下拉刷新的函数 当数据请求完毕了之后要结束下拉刷新转圈圈的效果 如果不调用结束就会一直转.【注意】这句代码要拷贝demo(实际案例)中的，官方文档的代码是不对的
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        }, 1500);

    }

    // var count = 0;
    var page = 1;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        console.log('你触发了 上拉');
        // 定时器为了模拟延迟 
        setTimeout(function () {
            // 上拉加载的是下一页的数据，不能再用这个queryProduct();函数，这个只能替换，不能得到更多的数据
            $.ajax({
                type: 'get',
                url: '/product/queryProduct',
                data: {
                    page: ++page,
                    pageSize: 4,
                    proName: search
                },
                success: function (res) {
                    // console.log(res.data);
                    // 上拉也是请求数据 加载更多 使用appendChild追加数据
                    if (res.data.length > 0) {
                        var html = template('productListTpl', {
                            list: res.data
                        });
                        $('.product-list .content .mui-row').append(html); //使用append追加数据
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                    } else {
                        // endPullupToRefresh 结束上拉加载更多 传递参数为true就没数据了
                        //参数为true代表没有更多数据了。
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);

                    }
                }
            })

            // queryProduct();
            // 后面这些就是在请求追加数据

        }, 1500);
    }

})