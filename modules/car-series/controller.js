/**
 * Created by LiKun on 2016/7/5.
 */
define(["modules/car-series/view"], function (View) {
    var controller = function (brandId) {
        var brandId = brandId;
        var view = new View();
        $.get(INTERFACE.carSeries, {brandId: brandId}, function (response) {
            if (response.success) {
                view.render(response.data, brandId);
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
