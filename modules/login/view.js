/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/login/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        render: function () {
            var compiled = _.template(template);
            this.$el.html(compiled);
            console.info("login module rendering finished! --- View:render");
        },
        events: {
            "click #get-captcha-btn": "getCaptcha",
            "click #login-btn": "userLogin"
        },
        getCaptcha: function () {
            countdown($("#get-captcha-btn"), $("#login-countdown-btn"), 30);
            var cellphoneNumber = $("#login-cellphone-number").val().trim();
            $.get(INTERFACE.regCode, {mobile: cellphoneNumber}, function (response) {
                if (response.success) {
                    // todo toast
                }
            });
        },
        userLogin: function () {
            var cellphoneNumber = $("#login-cellphone-number").val().trim();
            var loginCaptcha = $("#login-captcha").val().trim();
            var code = getParameter("code");
            $.get(INTERFACE.login, {
                mobile: cellphoneNumber,
                identifyCode: loginCaptcha,
                weixinAuthCode: code,
                eid: "xdt-mobile"
            }, function (response) {
                if (response.success) {
                    localStorage.setItem("xdtUserInfo", JSON.stringify(response.data));
                    router.navigate("index", {trigger: true, replace: true});
                } else {
                    toast(response.msg);
                }
            });
        }
    });

    // 验证码倒计时
    function countdown($captchaBtn, $countdownBtn, seconds) {
        $captchaBtn.hide();
        $countdownBtn.show();
        function count(seconds) {
            setTimeout(function () {
                if (seconds === 0) {
                    $countdownBtn.text("重新发送（30）");
                    $captchaBtn.show();
                    $countdownBtn.hide();
                } else {
                    seconds--;
                    $countdownBtn.text("重新发送（" + seconds + "）");
                    count(seconds);
                }
            }, 1000);
        }
        count(seconds);
    }

    // 获取参数
    function getParameter(parameter) {
        var reg = new RegExp("[\?\&]" + parameter + "=([^\&]*)(\&?)", "i");
        var str = location.search.match(reg);
        return str ? str[1] : str;
    }
});