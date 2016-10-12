/**
 * Created by LiKun on 2016/6/23.
 */
define(["modules/order-list/subView", "text!modules/order-list/template.html", "router"], function (SubView, template, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            allOrders: null,
            subView: null
        },
        render: function (orders, allOrders) {
            var compiled = _.template(template);
            this.$el.html(compiled({orders: orders}));

            this.varCache.allOrders = allOrders;
            this.varCache.subView = new SubView();
            console.info("order-list module rendering finished! --- View:render");
        },
        events: {
            "click .order-type:not(.active)": "switchOrderType"
        },
        switchOrderType: function (event) {
            var $target = $(event.currentTarget);
            var index  = $target.index();
            console.log($target);
            $target.addClass("active").siblings().removeClass("active");
            var screenedOrders = null;
            switch (index) {
                case 0:
                    screenedOrders = this.varCache.allOrders;
                    break;
                case 1:
                    screenedOrders = this.varCache.allOrders.where({statusCode: "1"});
                    break;
                case 2:
                    screenedOrders = this.varCache.allOrders.where({statusCode: "2"});
                    break;
                default:
                    break;
            }
            console.log(screenedOrders);
            var screenedOrderArr = [];
            screenedOrders.forEach(function (item) {
                screenedOrderArr.push(item.toJSON());
            });
            this.varCache.subView.render(screenedOrderArr);
        }
    });
    
});