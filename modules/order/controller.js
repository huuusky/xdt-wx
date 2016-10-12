/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/order/view"], function (View) {
    var controller = function (shopId) {
        var view = new View();
        var token = xdtGlobal.userInfo.token;

        // 订单填写请求数据
        var fillOrderJson = {
            carId: xdtGlobal.userInfo.defaultCar.carId,
            shopId: shopId,
            paintService: xdtGlobal.selectedParts,
            fromType: "01"
        };

        // 获取订单填写预置信息
        $.get(INTERFACE.fillOrder, {
            token: token,
            jsonStr: JSON.stringify(fillOrderJson)
        }, function (response) {
            if (response.success) {
                var orderPresetData = response.data;

                // 获取商家优惠详情
                $.get(INTERFACE.shopPromotion, {
                    token: token,
                    shopId: shopId,
                    action: "order"
                }, function (response) {
                    if (response.success) {
                        var shopPromotionData = response.data;
                        var dateList = prepareDateList(shopPromotionData.today);

                        view.render(orderPresetData, shopPromotionData, dateList);
                    } else {
                        toast(response.msg);
                    }
                });

            } else {
                toast(response.msg);
            }
        });
        
        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    // 获取日期列表
    function prepareDateList(today) {
        var dateList = [];
        var weekLabel = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var date = new Date(today[0], today[1], today[2]);
        var oneDayMilliseconds = 24 * 60 * 60 * 1000; // 一天的毫秒数86400000,
        var currentMilliseconds = date.getTime();
        for (var i = -1; i < 7; i++) {
            var dayMilliseconds = currentMilliseconds + oneDayMilliseconds * i;
            date.setTime(dayMilliseconds);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var dayOfWeek = (function () {
                if (i === -1) {
                    return "昨天";
                } else if (i === 0) {
                    return "今天";
                } else {
                    return weekLabel[date.getDay()];
                }
            })();

            dateList.push({
                date: month + "." + day,
                dayOfWeek: dayOfWeek
            });
        }

        return dateList;
    }


    return controller;
});
