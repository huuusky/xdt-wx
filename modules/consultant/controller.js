/**
 * Created by LiKun on 2016/5/27.
 */
define(["modules/consultant/view"], function (View) {
    return function () {
        var view = new View();
        view.render();

        this.onRouteChange = function () {
            view.undelegateEvents();
        };
    };
});
