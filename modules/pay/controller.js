/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/pay/view"], function (View) {
    var controller = function () {
        var view = new View();
        view.render();

        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    return controller;
});
