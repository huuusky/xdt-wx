/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/sheet-metal/view", "router"], function (View, router) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.guidePrice, {
            carId: xdtGlobal.userInfo.defaultCar.carId,
            serviceType: "0102"
        }, function (response) {
            if (response.success) {
                view.render(response.data);
            } else {
                toast(response.msg);
                router.navigate("paint", {trigger: true, replace: true});
            }
        });

        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    return controller;
});
