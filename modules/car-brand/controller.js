/**
 * Created by LiKun on 2016/7/5.
 */
define(["modules/car-brand/view"], function (View) {
    var controller = function () {
        var view = new View();

        $.get(INTERFACE.carBrands, function (response) {
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
