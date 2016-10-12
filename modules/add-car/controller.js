/**
 * Created by LiKun on 2016/7/6.
 */
define(["modules/add-car/view"], function (View) {
    var controller = function (carId) {
        var view = new View();
        $.get(INTERFACE.queryCar, {carId: carId}, function (response) {
            if (response.success) {
                view.render(response.data, carId);
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
