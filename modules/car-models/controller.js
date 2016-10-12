/**
 * Created by LiKun on 2016/7/5.
 */
define(["modules/car-models/view"], function (View) {
    var controller = function (seriesId) {
        var seriesId = seriesId;
        var view = new View();
        $.get(INTERFACE.carsModels, {seriesId: seriesId}, function (response) {
            if (response.success) {
                console.log(response.data);
                view.render(response.data, seriesId);
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
