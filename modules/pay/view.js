/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/pay/template.html", "wx", "router"], function (template, wx, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            $remainingHour: null,
            $remainingMinute: null,
            $remainingSecond: null
        },
        initialize: function () {
            console.info("pay module initialized! --- View:initialize");
        },
        render: function () {
            console.log(xdtGlobal.orderPayData);
            var compiled = _.template(template);
            this.$el.html(compiled({orderPayData: xdtGlobal.orderPayData}));

            this.varCache.$remainingHour = $("#remaining-hour");
            this.varCache.$remainingMinute = $("#remaining-minute");
            this.varCache.$remainingSecond = $("#remaining-second");

            this.getRemainingTime(xdtGlobal.orderPayData.createDate);
            console.info("pay module rendering finished! --- View:render");
        },
        events: {
            "click #payment-btn": "payment"
        },
        payment: function () {
            $.get(INTERFACE.wxSign, {
                url: location.origin + location.pathname
            }, function(response) {
                if (response.success) {
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.data.appId, // 必填，公众号的唯一标识
                        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                        signature: response.data.signature,// 必填，签名
                        jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
                    });
                } else {
                    toast(response.msg);
                }
            });

            wx.ready(function () {
                $.get(INTERFACE.wxPay, {
                    token: xdtGlobal.userInfo.token,
                    orderNo: xdtGlobal.orderPayData.orderNo
                }, function(response) {
                    if (response.success) {
                        console.log(response);
                        //alert(JSON.stringify(response.data));
                        wx.chooseWXPay({
                            timestamp: response.data.timestamp, // 支付签名时间戳
                            nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                            package: response.data.weixinPackage, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: response.data.sign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                router.navigate("order-list", {trigger: true, replace: true})
                            }
                        });
                    } else {
                        toast(response.msg);
                    }
                });
            });
        },
        getRemainingTime: function (orderCreateDate) {
            var self = this;
            var currentDate = new Date();
            var createDate = new Date(orderCreateDate.replace(/-/g, "/"));

            var timeDifference = createDate.getTime() + 24 * 60 * 60 * 1000 - currentDate.getTime();
            var second = Math.floor(timeDifference / 1000) % 60;
            var minute = Math.floor(timeDifference / 1000 / 60) % 60;
            var hour = Math.floor(timeDifference / 1000 / 60 / 60);
            setRemainingTime (hour, minute, second);

            var expireFn = function () {
                if (hour >= 0) {
                    setTimeout(function () {
                        second--;
                        if (second === -1) {
                            second = 59;
                            minute--;
                        }

                        if (minute === -1) {
                            minute = 59;
                            hour--;
                        }

                        setRemainingTime (hour, minute, second);
                        expireFn();
                    }, 1000);
                } else {
                    $("#pay-countdown").html('<div class="h5 orange">您的订单已超过支付期限！</div>');
                    $("#payment-btn").hide();
                }
            };

            expireFn();

            function setRemainingTime(hour, minute, second) {
                self.varCache.$remainingHour.text(hour < 10 ? "0" + hour : hour);
                self.varCache.$remainingMinute.text(minute < 10 ? "0" + minute : minute);
                self.varCache.$remainingSecond.text(second < 10 ? "0" + second : second);
            }
        }
    });
});
