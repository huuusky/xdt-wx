/**
 * Created by LiKun on 2016/7/16.
 */
define(["modules/about/view"], function (View) {
    var controller = function () {
        var view = new View();
        view.render();
        controller.onRouteChange = function () {
            view.delegateEvents();
        }
    };

    return controller;
});
