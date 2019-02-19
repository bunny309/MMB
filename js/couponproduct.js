$(function(){
    var mmm = new mmBuy();
    mmm.getcouponproduct();
    mmm.carousel();
    mmm.swiper();
})

function mmBuy(){}

mmBuy.prototype = {
    // 查询所有的 优惠卷列表信息
    getcouponproduct:function(){
        var couponid = this.getQueryString('couponid');
        $.ajax({
            url:"http://localhost:9090/api/getcouponproduct",
            data:{
                couponid:couponid
            },
            success:function(data){
                var html = template('couponproductTpl',data);
                console.log(data);
                $('.couponproduct').html(html);
            }
        })
    },
    // 点击优惠卷标题弹出控制优惠卷轮播图
    carousel :function(){
        var that = this;
        $(".couponproduct").on("tap","li.coupondetail",function(){
            that.index = $(this).data("index");
            that.img = $(this).data("img");
            var img = template('imgTpl',that.img);
            $('#mask-img').html(img);
            $("#mask").show();
        });

        // 点击优惠卷删除按钮
        $(".couponproduct").on("tap","li .product-del",function(){
            mui.toast('暂时没有接口',{ duration:'short', type:'div' });
            var li = this.parentNode.parentNode;
            mui.swipeoutClose(li);
            return false;
        });
        // 点击删除的按钮
        $('.mui-icon-closeempty').on('tap',function(){
            $("#mask").hide();
            return false;
        })
    },
    swiper:function(){
        var that = this;
        // 点击上一页
        $(".mui-icon-arrowleft").on("tap",function(e){
             e.stopPropagation();
            78
            if(that.index!=0){                that.index --;
                $("#mask img").attr("src",$("li.coupondetail").eq(that.index).find("img").attr("src"));
            }else{
                mui.toast('往上没有了',{ duration:'short', type:'div' });
            }
        });
         // 点击下一页
        $(".mui-icon-arrowright").on("tap",function(e){
            e.stopPropagation();
            if(that.index!=that.couponproducts){
                console.log(that.img)
                that.index ++;
                var main = document.getElementById('main'); 
                main.addEventListener('touchmove', function(e) { 
                    e.preventDefault(); 
                }, false);
                $("#mask img").attr("src",$("li.coupondetail").eq(that.index).find("img").attr("src"));
            }else{
                mui.toast('往下没有了',{ duration:'short', type:'div' });
            }
        });
    },
    // 根据 url 地址截取传参字符串
    /**
     * name 需要截取的字符串键
     */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}