/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/paint-shop-list/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        render: function (shops) {
            var compiled = _.template(template);
            this.$el.html(compiled({shops: shops}));
            console.info("paint-shop-list module rendering finished! --- View:render");
        },
        events: {
            "click .btn": "gotoFillOrder"
        },
        gotoFillOrder: function (event) {
            var $btn = $(event.currentTarget);
            xdtGlobal.paintShopId = $btn.attr("shop-id");
            router.navigate("order", {trigger: true});
        }
    });
});
