/**
 * Created by LiKun on 2016/5/26.
 */
define(["backbone"], function () {
    var routesMap = {
        "login": "modules/login/controller",
        "index": "modules/index/controller",
        "my": "modules/my/controller",
        "car-brand": "modules/car-brand/controller",
        "car-series/:brandId": "modules/car-series/controller",
        "car-models/:seriesId": "modules/car-models/controller",
        "add-car/:carId": "modules/add-car/controller",
        "my-cars": "modules/my-cars/controller",
        "paint": "modules/paint/controller",
        "sheet-metal": "modules/sheet-metal/controller",
        "paint-shop-list": "modules/paint-shop-list/controller",
        "order/:shopId": "modules/order/controller",
        "order-list": "modules/order-list/controller",
        "pay": "modules/pay/controller",
        "reservation-a": "modules/reservation-a/controller",
        "reservation-shop-list": "modules/reservation-shop-list/controller",
        "reservation-b": "modules/reservation-b/controller",
        "consultant": "modules/consultant/controller",
        "my-reservation": "modules/my-reservation/controller",
        "about": "modules/about/controller"
        // "*actions": "defaultRouter"
    };

    var Router = Backbone.Router.extend({
        routes: routesMap,
        defaultRouter: function () {
            console.info("default route!");
        }
    });

    var router = new Router();

    router.on("route", function (route, params) {
        require([route], function (controller) {
            if (router.currentController && router.currentController !== controller) {
                router.currentController.onRouteChange && router.currentController.onRouteChange();
            }
            router.currentController = controller;
            controller.apply(null, params);
        });
    });

    return router;
});