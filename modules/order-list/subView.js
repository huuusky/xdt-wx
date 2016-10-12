/**
 * Created by LiKun on 2016/6/23.
 */
define(["text!modules/order-list/subTemplate.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#content",
        render: function (orders) {
            var compiled = _.template(template);
            this.$el.html(compiled({orders: orders}));
            console.info("order-list-subView module rendering finished! --- View:render");
        }
    });
    
});