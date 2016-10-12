/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/paint-shop-list/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.paintShopList, {
            carId: xdtGlobal.userInfo.defaultCar.carId,
            jsonStr: JSON.stringify(xdtGlobal.selectedParts)
        }, function (response) {
            if (response.success) {
                view.render(response.data);
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
