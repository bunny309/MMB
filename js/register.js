$(function () {
    var mmm = new mmBuy();
    mmm.register();
});

var mmBuy = function () {

};

mmBuy.prototype = {
    // 用户注册
    register: function () {
        var that = this;
        var verification_code = null;
        // 注册为空判断
        $(".btn-register").on("tap", function () {
            var username = $(".register .username").val();
            var password = $(".register .password").val();
            var phone = $(".register .phone").val();
            var verification = $(".register .verification").val();
            var email = $(".register .email").val();
            var flag = true;
            // 用户注册非空判断
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
            // 如果都不为空，则保存数据到本地存储
            if (flag) {
                // 用户名验证
                if (username.length < 6 || username.length > 20) {
                    mui.toast('请输入合法的用户名6-20位之间', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
                // 密码验证
                if (password.length < 6 || password.length > 20) {
                    mui.toast('请输入合法的用户名6-20位之间', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
                // 手机号验证
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    mui.toast('请输入合法的手机号', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
                // 判断验证码
                if(verification != verification_code){
                    mui.toast('验证码错误', {
                        duration: 'short',
                        type: 'div',
                    });
                    return false;
                }
                // 邮箱验证
                if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email))) {
                    mui.toast('邮箱格式错误', {
                        duration: 'short',
                        type: 'div'
                    })
                    return false;
                }
                if(flag){
                    var user = {
                        username: username,
                        password: password,
                        phone: phone,
                        verification: verification,
                        email: email
                    }
                    console.log(user);
                    JSON.parse(localStorage.getItem('user') || '[]');
                    localStorage.setItem("user", JSON.stringify(user));
                    mui.toast('注册成功', {
                        duration: 'short',
                        type: 'div'
                    });
                    location.href = "login.html";
                }
            }
        })
        $('.btn-verification').on('click',function(){
            verification_code = that.numRandom();
            console.log("您的验证码为："+verification_code);
        });
    },
    numRandom: function() {
        var num="";
        for(var i=0;i<6;i++){
            num+=Math.floor(Math.random()*10)
        }
        return num;
    }
}