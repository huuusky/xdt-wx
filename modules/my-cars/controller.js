/**
 * Created by LiKun on 2016/7/7.
 */
define(["modules/my-cars/view"], function (View) {
    var controller = function () {
        var view = new View();
        $.get(INTERFACE.myCars, {token: xdtGlobal.userInfo.token}, function (response) {
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
