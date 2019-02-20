$(function(){
    var page;

    // 调用下面封装的函数
    getData(0);

    // 分页跳转的下拉框改变的事件
    $('#selectAge').change(function(e){
        e.preventDefault();
        getData(this.value - 1);
    })

    $('#previous').on('tap',function(){
        if(page == 0){
            return false;
        }
        getData(page - 1);
    })
    
    $('#below').on('tap',function(){
        if(page == 14){
            return false;
        }
        getData(page + 1);
    })

    // $('#previous').tap(function(){
    //     getData(page-1);
    // })

    // 封装一个获取商品列表请求的函数
    function getData(pageID){
        page = pageID;
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {pageid: pageID},
            success: function(data){
                // console.log(data);
                var html = template('tplSaveMoney',data);
                $('#main .mui-table-view').html(html);

                var allPage = Math.ceil(data.totalCount / data.pagesize);
                newOp(allPage);
                $('#selectAge').val(page + 1);
            }
        })
    }

    //封装一个生成option的函数
    function newOp(allPage){
        for(var i = 0;i < allPage;i++){
            var op = document.createElement('option');
            op.value = i + 1;
            op.innerHTML = op.value + '/' + allPage;
            $('#selectAge').append(op);
        }
    }
})