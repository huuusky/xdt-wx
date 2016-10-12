/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/paint/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.guidePrice, {
            carId: xdtGlobal.userInfo.defaultCar.carId,
            serviceType: "0101"
        }, function (response) {
            if (response.success) {
                view.render(xdtGlobal.userInfo.defaultCar, response.data);
            } else {
                toast(response.msg);
            }
        });

        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    return controller;
});
