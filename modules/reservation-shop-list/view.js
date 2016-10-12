/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/reservation-shop-list/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        render: function (shops) {
            var compiled = _.template(template);
            this.$el.html(compiled({shops: shops}));
            console.info("paint-shop-list module rendering finished! --- View:render");
        },
        events: {
            "click .shop": "selectReservationShop"
        },
        selectReservationShop: function (event) {
            var $selectedShop = $(event.currentTarget);
            xdtGlobal.reservationData.shopId = $selectedShop.attr("shop-id");
            router.navigate("reservation-b", {trigger: true});
        }
    });
});
