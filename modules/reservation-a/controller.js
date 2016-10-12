/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/reservation-a/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.reservationItemList, {token: xdtGlobal.userInfo.token}, function (response) {
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
