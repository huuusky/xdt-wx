/**
 * Created by LiKun on 2016/6/23.
 */
define(["modules/order-list/model", "modules/order-list/view"], function (model, View) {
    var controller = function () {
        var order = new model.order;
        var orders = new model.orders;
        var view = new View();

        orders.fetch({
            url: INTERFACE.orderList,
            data: {token: xdtGlobal.userInfo.token},
            success: function (model, response) {
                if (response.success) {
                    orders.set(response.data);
                    view.render(orders.toJSON(), orders);
                } else {
                    toast(response.msg);
                }
            }
        });

        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    return controller;
});