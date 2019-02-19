$(function () { 
    var mmm = new mmBuy();
    mmm.login();
 });

var mmBuy=function () { 

};
mmBuy.prototype={
    // 用户登录
    login:function () { 
        $(".btn-login").on("tap",function () { 
            console.log(1)
            var username = $(".login .username").val();
            var password = $(".login .password").val();
            var flag = true;
            $('.mui-input-group input').each(function (index, value) {
                var val = $(value).val().trim();
                if (!val) {
                    console.log($(value).prev())
                    mui.toast($(value).prev()[0].innerText + '不允许为空', {
                        duration: 'short',
                        type: 'div'
                    });
                    flag = false;
                    return false;
                }
            })
            if(flag){
                // 用户名验证
                if (username.length < 6 || username.length > 20) {
                    mui.toast('请输入合法的用户名6-20位', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
                // 密码验证
                if (password.length < 6 || password.length > 20) {
                    mui.toast('请输入合法的密码6-20位', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
            }
            localStorage.getItem("user");
            var user = JSON.parse(localStorage.getItem("user") || '[]');
            console.log(user.username,user.password)
            if(username != user.username || password != user.password){
                
                mui.toast('账号或者密码错误',{ duration:'short', type:'div' });
                return false;
            }else{
                location = '../index.html';         
            }
         })
     }
}