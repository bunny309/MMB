$(function(){
    var mmm = new mmBuy();
    mmm.getCoupon();
})
// 创建一个 慢慢买的构造函数
function mmBuy(){}

// 慢慢买的原型添加构造方法
mmBuy.prototype = {
    // 获取所以的优惠卷列表
    getCoupon:function(){
        $.ajax({
            url:'http://localhost:9090/api/getcoupon',
            success:function(data){
                console.log(data);
                console.log(data.result);
                var html = template('getcouponTpl',{data:data.result});
                $('.coupon-list').html(html);
            }
        })
    }
}