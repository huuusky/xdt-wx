/**
 * Created by LiKun on 2016/7/4.
 */
define(["modules/my-reservation/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.myReservation, {token: xdtGlobal.userInfo.token}, function (response) {
            if (response.success) {
                view.render(response.data);
            } else {
                toast(response.msg);
            }
        });

        controller.onRouteChange = function () {
            view.undelegateEvents();
        }
    };
    
    return controller;
});
