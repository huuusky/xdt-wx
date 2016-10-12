/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/reservation-shop-list/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.reservationShopList, {
            token: xdtGlobal.userInfo.token,
            carModel: xdtGlobal.reservationData.carId,
            categoryCode: xdtGlobal.reservationData.reservedServiceType
        }, function (response) {
            if (response.success) {
                view.render(response.data.shopList);
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
